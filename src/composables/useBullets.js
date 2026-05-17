import { CANVAS_W, CANVAS_H } from "../constants/game.js";

export function useBullets() {
  function updateBullets(bullets, dt) {
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.life -= dt;
      if (b.x < 0 || b.x > CANVAS_W || b.y < 0 || b.y > CANVAS_H) {
        bullets.splice(i, 1);
        continue;
      }
    }
  }

  return { updateBullets };
}
