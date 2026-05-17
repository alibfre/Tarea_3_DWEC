<template>
  <div class="overlay">
    <div class="title">SKYRAIDER</div>
    <div class="subtitle">// dogfight protocol v1.0 //</div>
    <button class="btn" @click="$emit('start')">Iniciar Misión</button>
    <div class="hint">WASD / ↑↓←→ · MOVER &nbsp;|&nbsp; ESPACIO · DISPARAR</div>
  </div>
</template>

<script setup>
defineEmits(['start']);
</script>

<style scoped>
.overlay {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  background: rgba(5,5,15,0.88);
  backdrop-filter: blur(4px);
}
.title {
  font-family: 'Orbitron', monospace;
  font-size: 52px; font-weight: 900;
  letter-spacing: 8px; color: #fff;
  text-shadow: 0 0 30px rgba(80,120,255,0.8);
  animation: pulse 2s ease-in-out infinite;
  margin-bottom: 8px;
}
.subtitle {
  font-size: 11px; letter-spacing: 5px;
  color: #4a6aaa; margin-bottom: 50px;
}
.btn {
  font-family: 'Orbitron', monospace;
  font-size: 13px; font-weight: 700;
  letter-spacing: 4px; padding: 14px 40px;
  border: 1px solid #3a5aaa;
  background: transparent; color: #8aaeff; cursor: pointer;
  transition: all 0.2s;
}
.btn:hover { border-color: #8aaeff; color: #fff; }
.hint {
  position: absolute; bottom: 16px;
  font-size: 10px; color: #2a3a6a; letter-spacing: 3px;
}
@keyframes pulse {
  0%, 100% { text-shadow: 0 0 30px rgba(80,120,255,0.8); }
  50% { text-shadow: 0 0 60px rgba(80,120,255,1); }
}
</style>