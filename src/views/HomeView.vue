<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero3D from '../components/Hero3D.vue'
import TypewriterHeadline from '../components/TypewriterHeadline.vue'

gsap.registerPlugin(ScrollTrigger)

const activeIntro = ref('Professional Summary')
const previousIntro = ref('Professional Summary')
const peelLayer = ref<HTMLElement | null>(null)
const contentCardWrapper = ref<HTMLElement | null>(null)
const isAnimating = ref(false)

onMounted(() => {
  // Prevent browser from restoring previous scroll position on refresh
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual'
  }
  window.scrollTo(0, 0)

  if (contentCardWrapper.value) {
    gsap.from(contentCardWrapper.value, {
      scrollTrigger: {
        trigger: contentCardWrapper.value,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      x: 150,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    })
  }
})

const handleMenuClick = async (id: string) => {
  if (isAnimating.value || activeIntro.value === id) return

  // Start animation
  activeIntro.value = id
  isAnimating.value = true

  // Wait a tick for text update
  await nextTick()

  const proxy = { radius: 0 }

  if (peelLayer.value) {
    peelLayer.value.style.clipPath = `circle(0% at 100% 0%)`
    peelLayer.value.style.webkitClipPath = `circle(0% at 100% 0%)`
  }

  gsap.to(proxy, {
    radius: 150,
    duration: 0.8,
    ease: 'power2.inOut',
    onUpdate: () => {
      if (peelLayer.value) {
        peelLayer.value.style.clipPath = `circle(${proxy.radius}% at 100% 0%)`
        peelLayer.value.style.webkitClipPath = `circle(${proxy.radius}% at 100% 0%)`
      }
    },
    onComplete: () => {
      previousIntro.value = id
      isAnimating.value = false
      if (peelLayer.value) {
        peelLayer.value.style.clipPath = `circle(0% at 100% 0%)`
        peelLayer.value.style.webkitClipPath = `circle(0% at 100% 0%)`
      }
    },
  })
}

const introOptions = [
  {
    id: 'Professional Summary',
    text: 'Software Engineer with 3+ years of experience in banking and finance, specializing as a Fullstack Developer and Frontend Angular Developer.',
  },
  {
    id: 'Frontend Expertise',
    text: 'Extensive experience leading frontend optimizations and platform migrations across Angular versions (v16-v21), using Tailwind CSS and TypeScript.',
  },
  {
    id: 'Backend & Architecture',
    text: 'Expert in orchestrating backend integration via API Gateways using Java 17+, Spring Boot 3, PostgreSQL, and Microfrontend Architectures.',
  },
  {
    id: 'DevOps & Testing',
    text: 'Adept at managing the "You Build It, You Run It" product lifecycle with CI/CD, OpenShift, SonarQube, and automated testing (JUnit, Jasmine).',
  },
]
</script>

<template>
  <main class="w-full min-h-screen relative">
    <!-- Hero Section (3D Background) -->
    <section class="relative w-full h-screen flex flex-col justify-end overflow-hidden">
      <!-- 3D Canvas -->
      <Hero3D />

      <!-- Center Typing Text -->
      <TypewriterHeadline />

      <!-- Minimalist scrolling indicator -->
      <div
        class="absolute bottom-48 md:bottom-56 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 z-20 mix-blend-difference text-white"
      >
        <span class="text-xs uppercase tracking-[0.2em] font-medium">Scroll to explore</span>
        <div class="w-px h-8 bg-white/50 relative overflow-hidden">
          <div
            class="w-full h-full bg-white absolute top-0 -translate-y-full animate-[scrolldown_1.5s_ease-in-out_infinite]"
          ></div>
        </div>
      </div>
    </section>

    <!-- About Section (Interactive Intro) -->
    <section id="about" class="w-full bg-black/40 backdrop-blur-sm text-white py-32 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
        <!-- Sidebar Menu -->
        <div class="md:col-span-4 lg:col-span-3">
          <h2 class="text-5xl md:text-6xl font-bold tracking-tight mb-12">Intro</h2>
          <ul class="flex flex-col gap-6 text-gray-500 font-light text-lg">
            <li
              v-for="option in introOptions"
              :key="option.id"
              @click="handleMenuClick(option.id)"
              class="group flex items-center gap-5 cursor-pointer transition-all duration-300"
              :class="
                activeIntro === option.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              "
            >
              <div
                class="h-px transition-all duration-500 ease-out"
                :class="
                  activeIntro === option.id
                    ? 'w-12 bg-white'
                    : 'w-6 bg-gray-700 group-hover:bg-gray-400 group-hover:w-8'
                "
              ></div>
              <span class="text-xl tracking-wide transition-all duration-300">{{ option.id }}</span>
            </li>
          </ul>
        </div>

        <!-- Content Card -->
        <div class="md:col-span-8 lg:col-span-9" ref="contentCardWrapper">
          <div
            class="bg-[#1a1a1a] rounded-3xl relative border border-white/5 min-h-100 shadow-2xl overflow-hidden"
          >
            <!-- Base Layer (Old Page) -->
            <div class="absolute inset-0 p-8 md:p-16 flex items-center">
              <div
                class="absolute top-0 right-0 w-16 h-16 bg-[#111] border-b border-l border-white/5 shadow-[-4px_4px_10px_rgba(0,0,0,0.5)] z-10"
                style="border-bottom-left-radius: 1.5rem; border-top-right-radius: 1.5rem"
              ></div>
              <p class="text-3xl md:text-4xl lg:text-5xl font-light leading-snug text-gray-300">
                {{ introOptions.find((o) => o.id === previousIntro)?.text }}
              </p>
            </div>

            <!-- Peel Layer (New Page) -->
            <div
              ref="peelLayer"
              class="absolute inset-0 bg-[#1a1a1a] p-8 md:p-16 z-20 flex items-center border border-white/5 rounded-3xl"
              style="
                clip-path: circle(0% at 100% 0%);
                -webkit-clip-path: circle(0% at 100% 0%);
                pointer-events: none;
              "
            >
              <div
                class="absolute top-0 right-0 w-16 h-16 bg-[#111] border-b border-l border-white/5 shadow-[-4px_4px_10px_rgba(0,0,0,0.5)] z-10"
                style="border-bottom-left-radius: 1.5rem; border-top-right-radius: 1.5rem"
              ></div>
              <p class="text-3xl md:text-4xl lg:text-5xl font-light leading-snug text-gray-300">
                {{ introOptions.find((o) => o.id === activeIntro)?.text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Systems Section -->
    <section class="w-full bg-black/40 backdrop-blur-sm text-white py-32 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div class="max-w-7xl mx-auto">
        <div class="mb-16">
          <div
            class="flex items-center gap-3 mb-6 text-emerald-500 text-sm tracking-widest uppercase"
          >
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Since 2022
          </div>
          <h2 class="text-5xl md:text-7xl font-semibold tracking-tight mb-8">Featured Systems</h2>
          <p class="text-xl md:text-2xl text-gray-400 font-light max-w-2xl leading-relaxed">
            I architect scalable platforms and resilient backends to power mission-critical
            services.
          </p>
        </div>

        <!-- Featured Project Card -->
        <div
          class="project-card group cursor-pointer w-full bg-emerald-400/10 rounded-4xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(52,211,153,0.1)] transition-all duration-500 overflow-hidden relative border border-emerald-500/20"
        >
          <div
            class="absolute top-6 left-8 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full text-emerald-400 text-sm font-medium z-10 border border-emerald-500/30"
          >
            01 / 02
          </div>
          <div class="w-full relative z-10 pt-4">
            <!-- Mockup Image -->
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop"
              alt="High-Traffic Banking Network"
              class="w-full h-auto max-h-150 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <div
          class="mt-8 px-4 flex flex-col md:flex-row justify-between items-start md:items-center"
        >
          <div>
            <p class="text-sm text-gray-500 tracking-[0.2em] uppercase mb-2">
              Backend Architecture
            </p>
            <h3
              class="text-3xl font-medium hover:text-emerald-400 transition-colors cursor-pointer"
            >
              High-Traffic Banking Network
            </h3>
          </div>
          <p class="text-gray-400 max-w-md mt-4 md:mt-0 text-sm leading-relaxed">
            Engineered a microservices ecosystem processing thousands of transactions per second,
            utilizing Java 17, Spring Boot 3, and Kafka.
          </p>
        </div>
      </div>
    </section>

    <!-- Playground Section -->
    <section class="w-full bg-black/40 backdrop-blur-sm text-white py-32 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        <!-- Left Text -->
        <div class="lg:w-1/3">
          <div class="flex items-center gap-3 mb-6 text-blue-400 text-sm tracking-widest uppercase">
            <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Since 2024
          </div>
          <h2 class="text-5xl md:text-7xl font-semibold tracking-tight mb-8">Playground</h2>
          <p class="text-xl text-gray-400 font-light leading-relaxed mb-12">
            A space for side-projects, fullstack prototypes, and technical experiments driven by
            curiosity, code, and fast iteration.
          </p>
          <RouterLink
            to="/projects"
            class="text-sm text-gray-500 hover:text-white transition-colors tracking-widest uppercase flex items-center gap-2 w-fit group"
          >
            View All Projects
            <span class="group-hover:translate-x-2 transition-transform">→</span>
          </RouterLink>
        </div>

        <!-- Right Grid -->
        <div class="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <!-- Item 1 -->
          <div class="flex flex-col gap-6">
            <div
              class="project-card group cursor-pointer bg-blue-900/20 border border-blue-500/20 rounded-4xl aspect-4/3 overflow-hidden relative hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] transition-all duration-500"
            >
              <img
                src="https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop"
                class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                alt="Book App"
              />
              <div
                class="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium border border-white/10 text-white"
              >
                Fullstack App
              </div>
            </div>
            <div class="px-2">
              <h3
                class="text-2xl font-medium mb-2 group-hover:text-blue-400 transition-colors cursor-pointer"
              >
                Book Management
              </h3>
              <p class="text-gray-500 text-sm">Angular 19, Spring Boot, PostgreSQL</p>
            </div>
          </div>
          <!-- Item 2 -->
          <div class="flex flex-col gap-6 md:pt-24">
            <div
              class="project-card group cursor-pointer bg-fuchsia-900/20 border border-fuchsia-500/20 rounded-4xl aspect-4/3 overflow-hidden relative hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(217,70,239,0.1)] transition-all duration-500"
            >
              <img
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop"
                class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                alt="Food Stall"
              />
              <div
                class="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium border border-white/10 text-white"
              >
                E-Commerce
              </div>
            </div>
            <div class="px-2">
              <h3
                class="text-2xl font-medium mb-2 group-hover:text-fuchsia-400 transition-colors cursor-pointer"
              >
                Food Stall Web
              </h3>
              <p class="text-gray-500 text-sm">React TS, Java, MySQL</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="w-full bg-black/60 backdrop-blur-md text-white py-32 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div class="max-w-7xl mx-auto text-center">
        <h2 class="text-4xl md:text-6xl font-semibold tracking-tight mb-6">Technical Arsenal</h2>
        <p class="text-lg text-gray-400 font-light max-w-2xl mx-auto mb-20">
          Core technologies and architectures I use to build secure, highly available applications.
        </p>

        <div class="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          <div
            class="px-6 py-3 rounded-full border border-white/10 bg-[#111] hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 text-lg font-medium cursor-pointer"
          >
            Java 17+
          </div>
          <div
            class="px-6 py-3 rounded-full border border-white/10 bg-[#111] hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 text-lg font-medium cursor-pointer"
          >
            Spring Boot 3
          </div>
          <div
            class="px-6 py-3 rounded-full border border-white/10 bg-[#111] hover:bg-emerald-400 hover:text-black hover:border-emerald-400 hover:scale-105 transition-all duration-300 text-lg font-medium cursor-pointer"
          >
            Vue 3
          </div>
          <div
            class="px-6 py-3 rounded-full border border-white/10 bg-[#111] hover:bg-red-500 hover:text-white hover:border-red-500 hover:scale-105 transition-all duration-300 text-lg font-medium cursor-pointer"
          >
            Angular v16-v21
          </div>
          <div
            class="px-6 py-3 rounded-full border border-white/10 bg-[#111] hover:bg-blue-400 hover:text-black hover:border-blue-400 hover:scale-105 transition-all duration-300 text-lg font-medium cursor-pointer"
          >
            React TS
          </div>
          <div
            class="px-6 py-3 rounded-full border border-white/10 bg-[#111] hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-105 transition-all duration-300 text-lg font-medium cursor-pointer"
          >
            PostgreSQL
          </div>
          <div
            class="px-6 py-3 rounded-full border border-white/10 bg-[#111] hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 text-lg font-medium cursor-pointer"
          >
            Microservices
          </div>
          <div
            class="px-6 py-3 rounded-full border border-white/10 bg-[#111] hover:bg-red-600 hover:text-white hover:border-red-600 hover:scale-105 transition-all duration-300 text-lg font-medium cursor-pointer"
          >
            OpenShift (OCP)
          </div>
          <div
            class="px-6 py-3 rounded-full border border-white/10 bg-[#111] hover:bg-sky-400 hover:text-black hover:border-sky-400 hover:scale-105 transition-all duration-300 text-lg font-medium cursor-pointer"
          >
            Tailwind CSS
          </div>
          <div
            class="px-6 py-3 rounded-full border border-white/10 bg-[#111] hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 text-lg font-medium cursor-pointer"
          >
            CI/CD
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@keyframes scrolldown {
  0% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
