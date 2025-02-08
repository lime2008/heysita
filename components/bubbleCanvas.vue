<template>
  <div id="large-header">
    <canvas id="bubble-canvas"></canvas>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, onUnmounted, ref } from "vue";

  const width = ref(0);
  const height = ref(0);
  const largeHeader = ref<HTMLElement | null>(null);
  const canvas = ref<HTMLCanvasElement | null>(null);
  const ctx = ref<CanvasRenderingContext2D | null>(null);
  const circles = ref<Circle[]>([]);
  let target = { x: 0, y: 0 };
  let animateHeader = true;
  let animationFrameId: number;

  class Circle {
    pos: { x: number; y: number };
    alpha: number;
    scale: number;
    velocity: number;

    constructor() {
      this.pos = { x: 0, y: 0 };
      this.alpha = 0;
      this.scale = 0;
      this.velocity = 0;
      this.init();
    }

    init() {
      this.pos.x = Math.random() * width.value;
      this.pos.y = height.value + Math.random() * 100;
      this.alpha = 0.1 + Math.random() * 0.3;
      this.scale = 0.1 + Math.random() * 0.3;
      this.velocity = Math.random();
    }

    draw() {
      if (this.alpha <= 0) {
        this.init();
      }
      this.pos.y -= this.velocity;
      this.alpha -= 0.0005;
      if (ctx.value) {
        ctx.value.beginPath();
        ctx.value.arc(
          this.pos.x,
          this.pos.y,
          this.scale * 10,
          0,
          2 * Math.PI,
          false,
        );
        ctx.value.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.value.fill();
      }
    }
  }

  onMounted(() => {
    if (typeof window !== "undefined") {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
      target = { x: 0, y: height.value };

      canvas.value = document.getElementById(
        "bubble-canvas",
      ) as HTMLCanvasElement;
      canvas.value.width = width.value;
      canvas.value.height = height.value;
      ctx.value = canvas.value.getContext("2d") as CanvasRenderingContext2D;

      circles.value = [];
      for (let x = 0; x < width.value * 0.5; x++) {
        circles.value.push(new Circle());
      }

      addListeners();
      animate();
    }
  });

  onUnmounted(() => {
    window.removeEventListener("resize", resize);
    cancelAnimationFrame(animationFrameId);
  });

  function addListeners() {
    window.addEventListener("resize", resize);
  }

  function resize() {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
    if (largeHeader.value) {
      largeHeader.value.style.height = height.value + "px";
    }
    if (canvas.value) {
      canvas.value.width = width.value;
      canvas.value.height = height.value;
    }
  }

  function animate() {
    if (animateHeader && ctx.value) {
      ctx.value.clearRect(0, 0, width.value, height.value);
      circles.value.forEach((circle) => circle.draw());
    }
    animationFrameId = requestAnimationFrame(animate);
  }
</script>

<style scoped>
  #large-header {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  canvas {
    display: block;
  }
</style>
