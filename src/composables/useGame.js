import { ref } from 'vue';
import { usePlayer } from './usePlayer.js';
import { useBullets } from './useBullets.js';
import { useEnemies } from './useEnemies.js';
import { useParticles } from './useParticles.js';
import { useRenderer } from './useRenderer.js';

export function useGame() {
  const gameState = ref('start');
  const score = ref(0);
  const lives = ref(3);

  const { createPlayer, updatePlayer, hitPlayer } = usePlayer();
  const { updateBullets } = useBullets();
  const { updateEnemies } = useEnemies();
  const { updateParticles, spawnExplosion } = useParticles();

  let player, bullets, enemies, particles;
  let animId, lastTime;
  let renderer = null;
  const keys = {};
  const spawnTimer = ref(0);

  function initGame() {
    player = createPlayer();
    bullets = [];
    enemies = [];
    particles = [];
    spawnTimer.value = 0;
    score.value = 0;
    lives.value = 3;
  }

  function startGame() {
    initGame();
    gameState.value = 'playing';
  }

  function onScore(pts) {
    score.value += pts;
  }

  function onHit(p, ex, ey) {
    spawnExplosion(particles, p.x, p.y, '#6699ff', 20);
    lives.value = hitPlayer(p, lives.value);
    if (lives.value <= 0) {
      setTimeout(() => { gameState.value = 'gameover'; }, 500);
    }
  }

  function loop(ts) {
    const dt = Math.min((ts - lastTime) / 1000, 0.05);
    lastTime = ts;

    if (gameState.value === 'playing') {
      updatePlayer(player, keys, dt, bullets);
      updateBullets(bullets, dt);
      updateEnemies(enemies, bullets, player, particles, dt, score.value, lives.value, spawnTimer, onScore, onHit);
      updateParticles(particles);
      renderer?.render(player, bullets, enemies, particles, keys);
    } else {
      renderer?.render({ x: -999, y: -999, angle: 0, invincible: true }, [], [], particles || [], {});
    }

    animId = requestAnimationFrame(loop);
  }

  function onKey(e, down) {
    keys[e.key] = down;
    if (e.key === ' ') e.preventDefault();
  }

  // Recibe el elemento canvas directamente, no el ref
  function mount(canvasEl) {
    const ctx = canvasEl.getContext('2d');
    const { render } = useRenderer(ctx);
    renderer = { render };
    particles = [];

    lastTime = performance.now();
    animId = requestAnimationFrame(loop);
    window.addEventListener('keydown', e => onKey(e, true));
    window.addEventListener('keyup', e => onKey(e, false));
  }

  function unmount() {
    cancelAnimationFrame(animId);
    window.removeEventListener('keydown', e => onKey(e, true));
    window.removeEventListener('keyup', e => onKey(e, false));
  }

  return { gameState, score, lives, startGame, mount, unmount };
}