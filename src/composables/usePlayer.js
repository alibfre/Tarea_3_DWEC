import { PLAYER, CANVAS_W, CANVAS_H } from '../constants/game.js';

export function usePlayer() {
  function createPlayer() {
    return {
      x: 200, y: 300,
      vx: 0, vy: 0,
      angle: 0,
      radius: PLAYER.radius,
      invincible: false,
      invTimer: 0,
      shootTimer: 0,
    };
  }

  function updatePlayer(player, keys, dt, bullets) {
    // Rotación
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) player.angle -= PLAYER.rotSpeed * dt;
    if (keys['ArrowRight'] || keys['d'] || keys['D']) player.angle += PLAYER.rotSpeed * dt;

    // Empuje
    if (keys['ArrowUp'] || keys['w'] || keys['W']) {
      player.vx += Math.cos(player.angle) * PLAYER.speed * dt;
      player.vy += Math.sin(player.angle) * PLAYER.speed * dt;
    }

    // Fricción e inercia
    player.vx *= 0.97;
    player.vy *= 0.97;

    // Límite de velocidad
    const spd = Math.hypot(player.vx, player.vy);
    if (spd > 300) {
      player.vx = (player.vx / spd) * 300;
      player.vy = (player.vy / spd) * 300;
    }

    player.x += player.vx * dt;
    player.y += player.vy * dt;

    // Wrap de pantalla
    if (player.x < -20) player.x = CANVAS_W + 20;
    if (player.x > CANVAS_W + 20) player.x = -20;
    if (player.y < -20) player.y = CANVAS_H + 20;
    if (player.y > CANVAS_H + 20) player.y = -20;

    // Disparo
    player.shootTimer -= dt;
    if ((keys[' '] || keys['Space']) && player.shootTimer <= 0) {
      player.shootTimer = PLAYER.shootCooldown;
      bullets.push({
        x: player.x + Math.cos(player.angle) * 22,
        y: player.y + Math.sin(player.angle) * 22,
        vx: Math.cos(player.angle) * PLAYER.bulletSpeed + player.vx,
        vy: Math.sin(player.angle) * PLAYER.bulletSpeed + player.vy,
        angle: player.angle,
        life: PLAYER.bulletLife,
      });
    }

    // Invencibilidad
    if (player.invincible) {
      player.invTimer -= dt;
      if (player.invTimer <= 0) player.invincible = false;
    }
  }

  function hitPlayer(player, lives) {
    if (player.invincible) return lives;
    player.invincible = true;
    player.invTimer = PLAYER.invincibleTime;
    return lives - 1;
  }

  return { createPlayer, updatePlayer, hitPlayer };
}