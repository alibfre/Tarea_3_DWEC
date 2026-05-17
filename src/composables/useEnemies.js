import { CANVAS_W, CANVAS_H, ENEMY_TYPES, SPAWN } from '../constants/game.js';

export function useEnemies() {
  function spawnEnemy(enemies, player, score) {
    const side = Math.floor(Math.random() * 4);
    let x, y;
    if (side === 0) { x = Math.random() * CANVAS_W; y = -30; }
    else if (side === 1) { x = CANVAS_W + 30; y = Math.random() * CANVAS_H; }
    else if (side === 2) { x = Math.random() * CANVAS_W; y = CANVAS_H + 30; }
    else { x = -30; y = Math.random() * CANVAS_H; }

    const typeName = Math.random() < 0.7 ? 'fighter' : 'bomber';
    const type = ENEMY_TYPES[typeName];
    const spd = type.speedMin + Math.random() * (type.speedMax - type.speedMin);
    const ang = Math.atan2(player.y - y, player.x - x);

    enemies.push({
      x, y,
      vx: Math.cos(ang) * spd,
      vy: Math.sin(ang) * spd,
      angle: ang + Math.PI,
      radius: type.radius,
      hp: type.hp,
      maxHp: type.hp,
      typeName,
      points: type.points,
      particleCount: type.particleCount,
      color: type.color,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: (Math.random() - 0.5) * 1.5,
    });
  }

  function updateEnemies(enemies, bullets, player, particles, dt, score, lives, spawnTimer, onScore, onHit) {
    // Actualizar spawn timer
    const spawnRate = Math.max(SPAWN.minRate, SPAWN.baseRate - score * SPAWN.scoreScaling);
    spawnTimer.value -= dt;
    if (spawnTimer.value <= 0) {
      spawnTimer.value = spawnRate;
      spawnEnemy(enemies, player, score);
      if (score > SPAWN.doubleSpawnScore && Math.random() < SPAWN.doubleSpawnChance) {
        spawnEnemy(enemies, player, score);
      }
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];
      e.wobble += e.wobbleSpeed * dt;
      e.x += e.vx * dt + Math.cos(e.wobble + Math.PI / 2) * 30 * dt;
      e.y += e.vy * dt + Math.sin(e.wobble) * 30 * dt;
      e.angle = Math.atan2(e.vy, e.vx) + Math.PI;

      // Wrap
      if (e.x < -50) e.x = CANVAS_W + 50;
      if (e.x > CANVAS_W + 50) e.x = -50;
      if (e.y < -50) e.y = CANVAS_H + 50;
      if (e.y > CANVAS_H + 50) e.y = -50;

      // Colisión bala-enemigo
      let destroyed = false;
      for (let j = bullets.length - 1; j >= 0; j--) {
        if (dist(bullets[j], e) < e.radius + 6) {
          bullets.splice(j, 1);
          e.hp--;
          spawnHitParticles(particles, e.x, e.y, e.color, 6);
          if (e.hp <= 0) {
            onScore(e.points);
            spawnHitParticles(particles, e.x, e.y, e.color, e.particleCount);
            enemies.splice(i, 1);
            destroyed = true;
            break;
          }
        }
      }
      if (destroyed) continue;

      // Colisión enemigo-jugador
      if (!player.invincible && dist(e, player) < e.radius + player.radius) {
        onHit(player, e.x, e.y);
      }
    }
  }

  function dist(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function spawnHitParticles(particles, x, y, color, count) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: Math.random() * 3 + 1,
        life: 1, maxLife: 1,
        decay: Math.random() * 0.03 + 0.015,
        color,
      });
    }
  }

  return { updateEnemies };
}