<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { useRoute } from 'vue-router'

const route = useRoute()

const cursor = ref<HTMLElement | null>(null)
const isHovering = ref(false)
const isProjectHover = ref(false)
const isVisible = ref(true)

const onMouseMove = (e: MouseEvent) => {
  const target = e.target as HTMLElement

  // Hide custom cursor when hovering over the navbar
  if (target.closest('nav')) {
    isVisible.value = false
  } else {
    isVisible.value = true
  }

  if (!cursor.value) return

  gsap.to(cursor.value, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.15,
    ease: 'power2.out',
  })
}

const onMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement

  if (target.closest('.project-card')) {
    isProjectHover.value = true
    isHovering.value = true
  } else {
    isProjectHover.value = false
    // Check if hovering over clickable elements
    if (
      target.closest('a') ||
      target.closest('button') ||
      target.closest('.cursor-pointer') ||
      (target.tagName && window.getComputedStyle(target).cursor === 'pointer')
    ) {
      isHovering.value = true
    } else {
      isHovering.value = false
    }
  }
}

onMounted(() => {
  if (cursor.value) {
    gsap.set(cursor.value, { xPercent: -50, yPercent: -50 })
  }
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseover', onMouseOver)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseover', onMouseOver)
})
</script>

<template>
  <div
    ref="cursor"
    class="fixed top-0 left-0 pointer-events-none z-9999 transition-opacity duration-300 flex items-center justify-center mix-blend-difference"
    :class="isVisible ? 'opacity-100' : 'opacity-0'"
  >
    <div
      class="bg-white rounded-full transition-all duration-300 ease-out flex items-center justify-center relative"
      :style="{
        width: isProjectHover ? '6rem' : isHovering ? '3rem' : '1rem',
        height: isProjectHover ? '6rem' : isHovering ? '3rem' : '1rem',
      }"
    >
      <span
        class="text-black text-xs font-semibold tracking-wider text-center leading-tight transition-opacity duration-300 delay-100"
        :class="isProjectHover ? 'opacity-100' : 'opacity-0 hidden'"
        v-html="route.path === '/projects' ? 'See<br />Detail' : 'View<br />Project'"
      >
      </span>
    </div>
  </div>
</template>

<style>
@media (hover: hover) and (pointer: fine) {
  * {
    cursor: none !important;
  }
  nav,
  nav * {
    cursor: default !important;
  }
  nav a,
  nav button,
  nav .cursor-pointer,
  nav a *,
  nav button *,
  nav .cursor-pointer * {
    cursor: pointer !important;
  }
}
</style>
