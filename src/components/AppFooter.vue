<script setup lang="ts">
import { RouterLink } from 'vue-router'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer
    class="w-full pt-32 pb-12 px-6 md:px-12 lg:px-24 bg-secondary border-t border-white/5 flex flex-col items-center z-10 relative"
  >
    <h2
      class="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-center mb-24 hover:text-gray-300 transition-colors cursor-pointer text-white"
    >
      Let's <br />
      Collaborate!
    </h2>

    <div
      class="w-full max-w-7xl mx-auto border-t border-white/10 pt-16 grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 text-white"
    >
      <div>
        <h4 class="text-xs tracking-[0.2em] text-gray-500 mb-6 uppercase font-medium">Menu</h4>
        <ul class="flex flex-col gap-4 text-sm text-gray-300">
          <li><RouterLink to="/" class="hover:text-white transition-colors">Home</RouterLink></li>
          <li>
            <RouterLink to="/about" class="hover:text-white transition-colors">About</RouterLink>
          </li>
          <li>
            <RouterLink to="/projects" class="hover:text-white transition-colors"
              >Projects</RouterLink
            >
          </li>
        </ul>
      </div>
      <div>
        <h4 class="text-xs tracking-[0.2em] text-gray-500 mb-6 uppercase font-medium">Connect</h4>
        <ul class="flex flex-col gap-4 text-sm text-gray-300">
          <li>
            <a
              href="https://www.linkedin.com/in/hadid-hardiansyah-14a765219/"
              target="_blank"
              class="hover:text-white transition-colors"
              >LinkedIn ↗</a
            >
          </li>
          <li>
            <a href="mailto:hadidhardiansyah@gmail.com" class="hover:text-white transition-colors"
              >Email</a
            >
          </li>
          <li>
            <a
              href="https://github.com/hadidhardiansyah"
              target="_blank"
              class="hover:text-white transition-colors"
              >GitHub ↗</a
            >
          </li>
        </ul>
      </div>
      <div class="col-span-2 md:col-span-2">
        <h4 class="text-xs tracking-[0.2em] text-gray-500 mb-6 uppercase font-medium">Say Hello</h4>
        <a
          href="mailto:hadidhardiansyah@gmail.com"
          class="text-xl md:text-3xl font-medium hover:text-blue-400 transition-colors block mb-4"
        >
          hadidhardiansyah@gmail.com
        </a>
        <div class="flex items-center gap-2 text-sm text-gray-400">
          <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Available for work — Jakarta, ID
        </div>
      </div>
    </div>

    <div
      class="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-gray-600 border-t border-white/5 pt-8"
    >
      <p>© 2026 Hadid Saputra — All rights reserved</p>
      <button
        @click="scrollToTop"
        class="hover:text-white transition-colors mt-4 md:mt-0 uppercase tracking-widest"
      >
        Back to Top ↑
      </button>
    </div>
  </footer>
</template>
