<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <nav
    class="fixed top-6 left-1/2 -translate-x-1/2 z-40 flex items-center justify-between p-2 bg-[#1a1a1a]/60 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/5 w-[90%] max-w-4xl transition-all duration-500 hover:bg-[#1a1a1a]/80 hover:border-white/10 group/nav"
  >
    <!-- Left: Avatar & Name -->
    <RouterLink
      to="/"
      class="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity"
    >
      <div class="relative">
        <!-- Placeholder avatar, can be replaced with a real photo later -->
        <img
          src="https://ui-avatars.com/api/?name=Hadid+Saputra&background=222&color=fff"
          alt="Avatar"
          class="w-10 h-10 rounded-full object-cover border border-white/10 shadow-lg"
        />
        <span
          class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#1a1a1a] rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)]"
        ></span>
      </div>
      <span class="font-semibold text-white tracking-wide"
        >Hadid<span class="text-emerald-400">.</span></span
      >
    </RouterLink>

    <!-- Right: Links & Socials -->
    <div class="flex items-center">
      <!-- Links -->
      <div class="hidden md:flex items-center gap-2 pr-4">
        <RouterLink
          to="/"
          class="relative px-5 py-2 text-sm text-gray-400 font-medium transition-all hover:text-white rounded-full hover:bg-white/5 group"
          exact-active-class="!text-white"
        >
          <span class="relative">
            Home
            <span class="absolute -bottom-1 left-0 w-full h-[2px] bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out shadow-[0_0_6px_rgba(255,255,255,0.6)] rounded-full"></span>
          </span>
        </RouterLink>
        <RouterLink
          to="/about"
          class="relative px-5 py-2 text-sm text-gray-400 font-medium transition-all hover:text-white rounded-full hover:bg-white/5 group"
          exact-active-class="!text-white"
        >
          <span class="relative">
            About
            <span class="absolute -bottom-1 left-0 w-full h-[2px] bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out shadow-[0_0_6px_rgba(255,255,255,0.6)] rounded-full"></span>
          </span>
        </RouterLink>
        <RouterLink
          to="/projects"
          class="relative px-5 py-2 text-sm text-gray-400 font-medium transition-all hover:text-white rounded-full hover:bg-white/5 group"
          exact-active-class="!text-white"
        >
          <span class="relative">
            Projects
            <span class="absolute -bottom-1 left-0 w-full h-[2px] bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out shadow-[0_0_6px_rgba(255,255,255,0.6)] rounded-full"></span>
          </span>
        </RouterLink>
      </div>

      <!-- Divider -->
      <div
        class="hidden md:block w-px h-6 bg-linear-to-b from-transparent via-gray-600 to-transparent mx-2"
      ></div>

      <!-- Social Icons -->
      <div class="flex items-center gap-2 px-3">
        <a
          href="https://www.linkedin.com/in/hadid-hardiansyah-14a765219/"
          target="_blank"
          class="p-2 rounded-full hover:bg-white/10 transition-all hover:-translate-y-1 group"
        >
          <svg
            viewBox="0 0 24 24"
            class="w-6 h-6 grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
            fill="#0A66C2"
          >
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
        </a>
        <a
          href="mailto:hadidhardiansyah@gmail.com"
          class="p-2 rounded-full hover:bg-white/10 transition-all hover:-translate-y-1 group"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
            alt="Gmail"
            class="w-6 h-6 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
          />
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMobileMenu"
        class="md:hidden p-2 ml-1 text-gray-400 hover:text-white focus:outline-none"
      >
        <svg
          v-if="!isMobileMenuOpen"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  </nav>

  <!-- Mobile Menu Dropdown -->
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform -translate-y-4 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform -translate-y-4 opacity-0"
  >
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-[#1a1a1a]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 z-30 p-4 flex flex-col gap-2"
    >
      <RouterLink
        to="/"
        @click="isMobileMenuOpen = false"
        class="px-4 py-3 text-white font-medium hover:bg-white/10 rounded-xl transition-colors"
        exact-active-class="bg-white/10 text-emerald-400"
      >
        Home
      </RouterLink>
      <RouterLink
        to="/about"
        @click="isMobileMenuOpen = false"
        class="px-4 py-3 text-white font-medium hover:bg-white/10 rounded-xl transition-colors"
        exact-active-class="bg-white/10 text-emerald-400"
      >
        About
      </RouterLink>
      <RouterLink
        to="/projects"
        @click="isMobileMenuOpen = false"
        class="px-4 py-3 text-white font-medium hover:bg-white/10 rounded-xl transition-colors"
        exact-active-class="bg-white/10 text-emerald-400"
      >
        Projects
      </RouterLink>
    </div>
  </Transition>
</template>
