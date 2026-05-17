<template>
  <div class="game-wrapper">
    <canvas ref="canvas" :width="W" :height="H" />
    <HUD v-if="gameState === 'playing'" :score="score" :lives="lives" />
    <StartScreen v-if="gameState === 'start'" @start="startGame" />
    <GameOverScreen v-if="gameState === 'gameover'" :score="score" @restart="startGame" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useGame } from './composables/useGame.js';
import { CANVAS_W, CANVAS_H } from './constants/game.js';
import HUD from './components/HUD.vue';
import StartScreen from './components/StartScreen.vue';
import GameOverScreen from './components/GameOverScreen.vue';

const W = CANVAS_W;
const H = CANVAS_H;
const canvas = ref(null);

const { gameState, score, lives, startGame, mount, unmount } = useGame();

onMounted(() => mount(canvas.value));  // ← pasa el elemento, no el ref
onUnmounted(() => unmount());
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: #0a0a0f;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: 'Share Tech Mono', monospace;
}

.game-wrapper {
  position: relative;
  width: 800px;
  height: 600px;
}

canvas {
  display: block;
  background: #080810;
  border: 1px solid #1a1a3a;
  box-shadow: 0 0 60px rgba(80,120,255,0.15);
}
</style>