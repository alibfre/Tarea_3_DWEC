export const CANVAS_W = 800;
export const CANVAS_H = 600;

export const PLAYER = {
  speed: 240,
  rotSpeed: 3.5,
  radius: 16,
  shootCooldown: 0.12,
  invincibleTime: 2,
  bulletSpeed: 500,
  bulletLife: 1.4,
};

export const ENEMY_TYPES = {
  fighter: {
    radius: 14,
    hp: 1,
    points: 10,
    speedMin: 80,
    speedMax: 140,
    color: '#ff6644',
    glowColor: '#ff8844',
    particleCount: 12,
  },
  bomber: {
    radius: 20,
    hp: 3,
    points: 30,
    speedMin: 45,
    speedMax: 75,
    color: '#cc4488',
    glowColor: '#ff44aa',
    particleCount: 20,
  },
};

export const SPAWN = {
  baseRate: 2.5,
  minRate: 0.6,
  scoreScaling: 0.002,
  doubleSpawnScore: 300,
  doubleSpawnChance: 0.3,
};

export const STARS_COUNT = 120;