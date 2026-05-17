<template>
  <div class="hud">
    <div class="hud-block">
      <div class="hud-label">Score</div>
      <div class="hud-value">{{ String(score).padStart(6, '0') }}</div>
    </div>
    <div class="hud-block hud-right">
      <div class="hud-label">Vidas</div>
      <div class="lives-display">
        <div
          v-for="i in 3"
          :key="i"
          class="life-icon"
          :class="{ empty: i > lives }"
        >
          <svg viewBox="0 0 20 20" fill="none">
            <polygon
              points="10,2 13,8 19,9 14.5,13.5 16,19 10,16 4,19 5.5,13.5 1,9 7,8"
              fill="#ff4444" stroke="#ff2222" stroke-width="0.5"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ score: Number, lives: Number });
</script>

<style scoped>
.hud {
  position: absolute;
  top: 0; left: 0; right: 0;
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}
.hud-block { display: flex; flex-direction: column; gap: 4px; }
.hud-right { align-items: flex-end; }
.hud-label {
  font-family: 'Orbitron', monospace;
  font-size: 9px;
  letter-spacing: 3px;
  color: #3a4a7a;
}
.hud-value {
  font-family: 'Orbitron', monospace;
  font-size: 22px;
  font-weight: 900;
  color: #c8d8ff;
  text-shadow: 0 0 12px rgba(100,160,255,0.6);
}
.lives-display { display: flex; gap: 6px; margin-top: 2px; }
.life-icon { width: 18px; height: 18px; }
.life-icon svg { filter: drop-shadow(0 0 4px rgba(255,80,80,0.7)); }
.life-icon.empty svg { opacity: 0.15; filter: none; }
</style>