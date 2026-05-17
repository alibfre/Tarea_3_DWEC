import { CANVAS_W, CANVAS_H, STARS_COUNT } from '../constants/game';

export function useRenderer(ctx) {
  const stars = Array.from({ length: STARS_COUNT }, () => ({
    x: Math.random() * CANVAS_W,
    y: Math.random() * CANVAS_H,
    r: Math.random() * 1.5 + 0.3,
    speed: Math.random() * 0.4 + 0.1,
    brightness: Math.random(),
  }));

  function drawBackground() {
    const nebula = ctx.createRadialGradient(400, 300, 50, 400, 300, 400);
    nebula.addColorStop(0, 'rgba(20,15,50,1)');
    nebula.addColorStop(1, 'rgba(5,5,15,1)');
    ctx.fillStyle = nebula;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    for (let y = 0; y < CANVAS_H; y += 4) {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, y, CANVAS_W, 2);
    }

    ctx.strokeStyle = 'rgba(40,60,120,0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < CANVAS_W; x += 80) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_H); ctx.stroke();
    }
    for (let y = 0; y < CANVAS_H; y += 80) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_W, y); ctx.stroke();
    }
  }

  function drawStars() {
    stars.forEach(s => {
      s.x -= s.speed;
      if (s.x < 0) { s.x = CANVAS_W; s.y = Math.random() * CANVAS_H; }
      const alpha = 0.3 + s.brightness * 0.5 + Math.sin(Date.now() * 0.001 + s.y) * 0.1;
      ctx.fillStyle = `rgba(${180 + s.brightness * 75}, ${180 + s.brightness * 75}, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawPlayer(player, keys) {
    const { x, y, angle } = player;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    // Ala superior
    ctx.fillStyle = '#4a7acc';
    ctx.beginPath();
    ctx.moveTo(-5, -8);
    ctx.lineTo(10, -18);
    ctx.lineTo(18, -12);
    ctx.lineTo(5, -4);
    ctx.closePath();
    ctx.fill();

    // Ala inferior
    ctx.beginPath();
    ctx.moveTo(-5, 8);
    ctx.lineTo(10, 18);
    ctx.lineTo(18, 12);
    ctx.lineTo(5, 4);
    ctx.closePath();
    ctx.fill();

    // Cuerpo central
    ctx.fillStyle = '#8aaeff';
    ctx.strokeStyle = '#c8d8ff';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(26, 0);
    ctx.lineTo(10, -7);
    ctx.lineTo(-18, -5);
    ctx.lineTo(-24, 0);
    ctx.lineTo(-18, 5);
    ctx.lineTo(10, 7);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cabina
    ctx.fillStyle = '#a0d8ff';
    ctx.strokeStyle = '#c8eeff';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.ellipse(8, 0, 9, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Reflejo cabina
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.beginPath();
    ctx.ellipse(10, -1.5, 4, 2, -0.4, 0, Math.PI * 2);
    ctx.fill();

    // Cañón
    ctx.fillStyle = '#c8d8ff';
    ctx.fillRect(20, -1.5, 10, 3);

    // Motor superior
    ctx.fillStyle = '#2a4a8a';
    ctx.fillRect(-22, -9, 10, 5);
    ctx.fillStyle = '#3a5aaa';
    ctx.fillRect(-20, -8, 6, 3);

    // Motor inferior
    ctx.fillStyle = '#2a4a8a';
    ctx.fillRect(-22, 4, 10, 5);
    ctx.fillStyle = '#3a5aaa';
    ctx.fillRect(-20, 5, 6, 3);

    // Llama del motor
    if (keys['ArrowUp'] || keys['w'] || keys['W']) {
      const flameLength = 14 + Math.random() * 8;
      const g1 = ctx.createLinearGradient(-22, 0, -22 - flameLength, 0);
      g1.addColorStop(0, 'rgba(120,200,255,0.9)');
      g1.addColorStop(0.4, 'rgba(80,120,255,0.6)');
      g1.addColorStop(1, 'rgba(80,120,255,0)');
      ctx.fillStyle = g1;
      ctx.beginPath();
      ctx.moveTo(-22, -7.5);
      ctx.lineTo(-22 - flameLength, -2);
      ctx.lineTo(-22 - flameLength, 2);
      ctx.lineTo(-22, 7.5);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }

  function drawEnemyFighter(e) {
    ctx.save();
    ctx.translate(e.x, e.y);
    ctx.rotate(e.angle);

    // Ala superior
    ctx.fillStyle = '#cc3322';
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(-14, -20);
    ctx.lineTo(-20, -14);
    ctx.lineTo(-8, -4);
    ctx.closePath();
    ctx.fill();

    // Ala inferior
    ctx.beginPath();
    ctx.moveTo(0, 6);
    ctx.lineTo(-14, 20);
    ctx.lineTo(-20, 14);
    ctx.lineTo(-8, 4);
    ctx.closePath();
    ctx.fill();

    // Cuerpo
    ctx.fillStyle = '#ff5533';
    ctx.strokeStyle = '#ff8866';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-24, 0);
    ctx.lineTo(-10, -8);
    ctx.lineTo(8, -5);
    ctx.lineTo(22, 0);
    ctx.lineTo(8, 5);
    ctx.lineTo(-10, 8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cabina
    ctx.fillStyle = '#1a0a0a';
    ctx.strokeStyle = '#ff4422';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.ellipse(-2, 0, 7, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Brillo cabina
    ctx.fillStyle = 'rgba(255,80,40,0.3)';
    ctx.beginPath();
    ctx.ellipse(-1, -1, 3, 1.5, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Cañones
    ctx.fillStyle = '#cc4422';
    ctx.fillRect(16, -7, 10, 2.5);
    ctx.fillRect(16, 4.5, 10, 2.5);

    ctx.restore();
  }

  function drawEnemyBomber(e) {
    ctx.save();
    ctx.translate(e.x, e.y);
    ctx.rotate(e.angle);

    // Escudo superior
    ctx.fillStyle = '#7a2266';
    ctx.beginPath();
    ctx.moveTo(4, -10);
    ctx.lineTo(-10, -28);
    ctx.lineTo(-26, -22);
    ctx.lineTo(-16, -8);
    ctx.closePath();
    ctx.fill();

    // Escudo inferior
    ctx.beginPath();
    ctx.moveTo(4, 10);
    ctx.lineTo(-10, 28);
    ctx.lineTo(-26, 22);
    ctx.lineTo(-16, 8);
    ctx.closePath();
    ctx.fill();

    // Cuerpo principal
    ctx.fillStyle = '#cc4499';
    ctx.strokeStyle = '#ff77cc';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(-18, -12);
    ctx.lineTo(0, -10);
    ctx.lineTo(18, -6);
    ctx.lineTo(26, 0);
    ctx.lineTo(18, 6);
    ctx.lineTo(0, 10);
    ctx.lineTo(-18, 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Núcleo
    ctx.fillStyle = '#1a0018';
    ctx.strokeStyle = '#ee55bb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(-4, 0, 10, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Brillo núcleo
    ctx.fillStyle = 'rgba(255,100,200,0.2)';
    ctx.beginPath();
    ctx.ellipse(-3, -2, 5, 3, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Cañón central
    ctx.fillStyle = '#aa3388';
    ctx.fillRect(18, -3, 14, 6);
    ctx.fillStyle = '#cc55aa';
    ctx.fillRect(28, -2, 6, 4);

    // Motores
    ctx.fillStyle = '#551144';
    ctx.fillRect(-32, -5, 8, 4);
    ctx.fillRect(-32, 1, 8, 4);

    // Llama motores
    const g = ctx.createLinearGradient(-32, 0, -44, 0);
    g.addColorStop(0, 'rgba(255,100,200,0.8)');
    g.addColorStop(1, 'rgba(255,100,200,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(-32, -4);
    ctx.lineTo(-42 - Math.random() * 6, 0);
    ctx.lineTo(-32, 4);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  function drawEnemy(e) {
    if (e.typeName === 'fighter') {
      drawEnemyFighter(e);
    } else {
      drawEnemyBomber(e);
    }
  }

  function drawBullet(b) {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.angle);
    const grd = ctx.createLinearGradient(-10, 0, 10, 0);
    grd.addColorStop(0, 'rgba(100,200,255,0)');
    grd.addColorStop(0.5, '#80d8ff');
    grd.addColorStop(1, '#ffffff');
    ctx.strokeStyle = grd;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(8, 0);
    ctx.stroke();
    const g2 = ctx.createRadialGradient(8, 0, 0, 8, 0, 5);
    g2.addColorStop(0, 'rgba(200,240,255,0.9)');
    g2.addColorStop(1, 'rgba(80,180,255,0)');
    ctx.fillStyle = g2;
    ctx.beginPath();
    ctx.arc(8, 0, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawParticle(p) {
    ctx.save();
    ctx.globalAlpha = p.life / p.maxLife;
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function render(player, bullets, enemies, particles, keys) {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    drawBackground();
    drawStars();
    particles.forEach(drawParticle);
    bullets.forEach(drawBullet);
    enemies.forEach(drawEnemy);

    const showPlayer = !player.invincible || Math.sin(Date.now() * 0.015) > 0;
    if (showPlayer) drawPlayer(player, keys);
  }

  return { render };
}