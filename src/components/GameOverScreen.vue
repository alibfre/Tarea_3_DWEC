<template>
  <div class="overlay">
    <div class="title">GAME OVER</div>
    <div class="label">Puntuación Final</div>
    <div class="score-value">{{ String(score).padStart(6, '0') }}</div>
    <button class="btn" @click="$emit('restart')">Reintentar</button>
  </div>
</template>

<script setup>
defineProps({ score: Number });
defineEmits(['restart']);
</script>

<style scoped>
.overlay {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  background: rgba(5,5,15,0.92);
  backdrop-filter: blur(4px);
}
.title {
  font-family: 'Orbitron', monospace;
  font-size: 48px; font-weight: 900;
  letter-spacing: 6px; color: #ff4444;
  text-shadow: 0 0 30px rgba(255,60,60,0.8);
  animation: glitch 3s infinite;
  margin-bottom: 10px;
}
.label {
  font-size: 14px; letter-spacing: 4px; color: #6a8acc;
}
.score-value {
  font-family: 'Orbitron', monospace;
  font-size: 36px; font-weight: 900;
  color: #c8d8ff;
  text-shadow: 0 0 20px rgba(100,160,255,0.5);
  margin-bottom: 50px; letter-spacing: 4px;
}
.btn {
  font-family: 'Orbitron', monospace;
  font-size: 13px; font-weight: 700; letter-spacing: 4px;
  padding: 14px 40px; border: 1px solid #3a5aaa;
  background: transparent; color: #8aaeff; cursor: pointer;
  transition: all 0.2s;
}
.btn:hover { border-color: #8aaeff; color: #fff; }
@keyframes glitch {
  0%, 90%, 100% { transform: none; }
  91% { transform: skewX(-5deg) translateX(-3px); }
  92% { transform: skewX(5deg) translateX(3px); color: #ff8888; }
  93% { transform: none; }
}
</style>