<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const loader = ref<HTMLElement | null>(null)
const progressCircle = ref<SVGCircleElement | null>(null)
const logoBracket1 = ref<HTMLElement | null>(null)
const logoLetter = ref<HTMLElement | null>(null)
const logoSlash = ref<HTMLElement | null>(null)
const logoBracket2 = ref<HTMLElement | null>(null)

onMounted(() => {
  const tl = gsap.timeline()

  // Animate circle progress
  const counter = { val: 0 }
  const circumference = 2 * Math.PI * 48 // approx 301.59

  if (progressCircle.value) {
    progressCircle.value.style.strokeDasharray = `${circumference}`
    progressCircle.value.style.strokeDashoffset = `${circumference}`
  }

  tl.to(
    counter,
    {
      val: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (progressCircle.value) {
          const offset = circumference - (counter.val / 100) * circumference
          progressCircle.value.style.strokeDashoffset = `${offset}`
        }
      },
    },
    0,
  )

  // Logo sequence animation
  tl.to(logoLetter.value, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' }, 0.3)
  tl.to(
    [logoBracket1.value, logoSlash.value, logoBracket2.value],
    { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15 },
    0.6,
  )

  // Fade out ring slightly before sliding up
  tl.to(
    '.loader-content',
    {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      ease: 'power2.inOut',
    },
    '+=0.2',
  )

  // Slide the loader up and out
  tl.to(
    loader.value,
    {
      yPercent: -100,
      duration: 1,
      ease: 'expo.inOut',
    },
    '-=0.1',
  )
})
</script>

<template>
  <div ref="loader" class="fixed inset-0 z-100 bg-secondary flex items-center justify-center">
    <div class="loader-content relative flex items-center justify-center w-32 h-32">
      <!-- Background Circle Track -->
      <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="none" stroke="#222" stroke-width="1" />
      </svg>

      <!-- Animated Progress Circle -->
      <svg class="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          ref="progressCircle"
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="#10b981"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>

      <!-- Center Logo -->
      <div class="text-[#10b981] font-mono text-xl font-medium tracking-tighter flex items-center">
        <span ref="logoBracket1" class="opacity-0 translate-x-3">&lt;</span>
        <span ref="logoLetter" class="opacity-0 scale-50 mx-0.5">H</span>
        <span ref="logoSlash" class="opacity-0 -translate-x-1">/</span>
        <span ref="logoBracket2" class="opacity-0 -translate-x-3">&gt;</span>
      </div>
    </div>
  </div>
</template>
