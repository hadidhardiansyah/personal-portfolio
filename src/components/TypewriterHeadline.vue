<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const titles = [
  'Hadid Hardiansyah Saputra',
  'Software Engineer',
  'Fullstack Developer',
  'Frontend Expert',
]

const currentText = ref(titles[0])
let titleIndex = 0
let charIndex = titles[0]?.length || 0
let isDeleting = true
let timeoutId: number | null = null

const typewriterStarted = ref(false)
const introName = ref<HTMLElement | null>(null)
const introNameFill = ref<HTMLElement | null>(null)
const subDesc = ref<HTMLElement | null>(null)

const type = () => {
  const currentTitle = titles[titleIndex]
  if (!currentTitle) return

  if (isDeleting) {
    currentText.value = currentTitle.substring(0, charIndex - 1)
    charIndex--
  } else {
    currentText.value = currentTitle.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = isDeleting ? 50 : 100

  // If word is complete
  if (!isDeleting && charIndex === currentTitle.length) {
    typeSpeed = 2000 // Pause at the end
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    titleIndex = (titleIndex + 1) % titles.length
    typeSpeed = 500 // Pause before typing next word
  }

  timeoutId = window.setTimeout(type, typeSpeed)
}

onMounted(() => {
  // Set initial scale so it starts small
  gsap.set(introName.value, { scale: 0.4 })

  const tl = gsap.timeline({
    onComplete: () => {
      typewriterStarted.value = true
      // Pause for a second on the large name before backspacing
      timeoutId = window.setTimeout(type, 1000)
    },
  })

  // Delay for the PageLoader to finish (3.5 seconds)
  tl.to(introNameFill.value, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 1.5,
    ease: 'power2.inOut',
    delay: 3.5,
  })

  // Scale up the name to its normal size
  tl.to(introName.value, {
    scale: 1,
    duration: 1,
    ease: 'expo.out',
  })

  // Fade in the sub description
  tl.to(
    subDesc.value,
    {
      opacity: 1,
      y: -10,
      duration: 1,
      ease: 'power2.out',
    },
    '-=0.5',
  )
})

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId)
})
</script>

<template>
  <div
    class="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-6 text-center"
  >
    <!-- Container to allow height to grow on mobile if text wraps -->
    <div class="relative flex justify-center items-center min-h-[120px] md:h-30 mb-8">
      <!-- Phase 2: Initial Name Fill & Scale Animation -->
      <div
        v-show="!typewriterStarted"
        ref="introName"
        class="text-5xl md:text-8xl font-medium tracking-tight text-[#444] relative origin-center whitespace-normal md:whitespace-nowrap leading-tight"
      >
        {{ titles[0] }}
        <span
          ref="introNameFill"
          class="absolute left-0 top-0 w-full h-full text-white overflow-hidden whitespace-normal md:whitespace-nowrap leading-tight"
          style="clip-path: inset(0 100% 0 0)"
        >
          {{ titles[0] }}
        </span>
      </div>

      <!-- Phase 3: Typewriter Headline (Swaps in after scale finishes) -->
      <h1
        v-show="typewriterStarted"
        class="text-5xl md:text-8xl font-medium tracking-tight whitespace-normal md:whitespace-nowrap text-white leading-tight"
      >
        {{ currentText }}<span class="animate-pulse">|</span>
      </h1>
    </div>

    <!-- Sub description -->
    <p
      ref="subDesc"
      class="max-w-xl text-sm md:text-base font-light text-gray-300 leading-relaxed opacity-0 transform translate-y-5"
    >
      Bogor-based Software Engineer specializing in banking and finance sectors with a track
      record of engineering secure, high-volume systems.
    </p>
  </div>
</template>
