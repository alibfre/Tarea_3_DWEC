<template>
  <canvas ref="canvas" :width="W" :height="H" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useGame } from '../composables/useGame.js';
import { CANVAS_W, CANVAS_H } from '../constants/game.js';

const W = CANVAS_W;
const H = CANVAS_H;
const canvas = ref(null);

const { mount, unmount } = inject('game');

onMounted(() => mount(canvas));
onUnmounted(() => unmount());
</script>