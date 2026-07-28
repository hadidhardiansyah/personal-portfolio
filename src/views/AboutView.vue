<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const timelineContainer = ref<HTMLElement | null>(null)
const timelineProgress = ref<HTMLElement | null>(null)

onMounted(() => {
  const nodes = document.querySelectorAll('.timeline-node')
  const dots = document.querySelectorAll('.timeline-dot')

  nodes.forEach((node, index) => {
    // Determine direction based on index (even = left, odd = right)
    const xOffset = index % 2 === 0 ? -50 : 50
    const dot = dots[index]

    gsap.from(node, {
      scrollTrigger: {
        trigger: node,
        start: 'top 70%', // Start slide-in a bit earlier so it's visible before becoming active
        toggleActions: 'play none none reverse',
      },
      x: xOffset,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })

    // Separate ScrollTrigger for the "active" highlight state
    ScrollTrigger.create({
      trigger: node,
      start: 'top 55%',
      end: 'bottom 45%',
      onEnter: () => {
        node.classList.add('active-node')
        if (dot) {
          dot.classList.remove('border-gray-400', 'bg-[#0a0a0a]')
          dot.classList.add(
            'bg-white',
            'shadow-[0_0_15px_rgba(255,255,255,0.8)]',
            'border-white',
            'scale-125',
          )
        }
      },
      onLeave: () => {
        node.classList.remove('active-node')
      },
      onEnterBack: () => {
        node.classList.add('active-node')
      },
      onLeaveBack: () => {
        node.classList.remove('active-node')
        if (dot) {
          dot.classList.add('border-gray-400', 'bg-[#0a0a0a]')
          dot.classList.remove(
            'bg-white',
            'shadow-[0_0_15px_rgba(255,255,255,0.8)]',
            'border-white',
            'scale-125',
          )
        }
      },
    })
  })

  if (timelineProgress.value && timelineContainer.value) {
    gsap.fromTo(
      timelineProgress.value,
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timelineContainer.value,
          start: 'top 55%',
          end: 'bottom 55%',
          scrub: true,
        },
      },
    )
  }
})
</script>

<template>
  <main class="w-full min-h-screen bg-secondary text-white pt-24">
    <!-- Hero Section -->
    <section
      class="w-full flex flex-col items-center justify-center pt-24 pb-32 relative overflow-hidden px-4"
    >
      <div class="text-center mb-16 z-10">
        <div
          class="flex items-center justify-center gap-2 mb-6 text-sm tracking-[0.2em] uppercase text-gray-500 font-medium"
        >
          <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
          ABOUT ME
        </div>
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 tracking-tight text-white">
          Hey! Thanks for stopping by
        </h1>
        <p class="text-lg md:text-2xl text-gray-400 font-light mb-2">
          Architecting Solutions and Scaling Platforms
        </p>
        <p class="text-lg md:text-2xl text-gray-400 font-light">
          Bridging Worlds Through Code and Innovation
        </p>
      </div>

      <div class="relative w-48 h-48 md:w-64 md:h-64 mt-10 md:mt-16">
        <!-- Center Image -->
        <div
          class="w-full h-full rounded-full border-[5px] border-blue-500 overflow-hidden relative shadow-[0_0_40px_rgba(59,130,246,0.3)] z-10 bg-[#111]"
        >
          <img
            src="https://ui-avatars.com/api/?name=Hadid+Saputra&background=222&color=fff&size=512"
            alt="Hadid"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-sm font-bold px-4 py-1 rounded-full z-20 whitespace-nowrap"
          >
            Hi! 👋
          </div>
        </div>

        <!-- Floating Pills -->
        <div
          class="absolute -top-2.5 -left-20 md:-top-5 md:-left-25 bg-[#fef08a] text-black text-xs font-bold px-4 py-2 rounded-full transform -rotate-6 animate-[bounce_3s_infinite] shadow-lg z-20"
        >
          Fullstack Developer
        </div>
        <div
          class="absolute top-5 -right-15 md:top-10 md:-right-25 bg-[#d8b4fe] text-black text-xs font-bold px-4 py-2 rounded-full transform rotate-6 animate-[bounce_4s_infinite] shadow-lg z-20"
          style="animation-delay: 0.5s"
        >
          Angular Expert
        </div>
        <div
          class="absolute -bottom-2.5 -left-15 md:-bottom-5 md:-left-20 bg-[#f9a8d4] text-black text-xs font-bold px-4 py-2 rounded-full transform -rotate-12 animate-[bounce_3.5s_infinite] shadow-lg z-20"
          style="animation-delay: 1s"
        >
          Spring Boot
        </div>
        <div
          class="absolute bottom-5 -right-12.5 md:bottom-0 md:-right-20 bg-[#93c5fd] text-black text-xs font-bold px-4 py-2 rounded-full transform rotate-12 animate-[bounce_4.5s_infinite] shadow-lg z-20"
          style="animation-delay: 1.5s"
        >
          System Architect
        </div>
      </div>
    </section>

    <!-- Timeline Section -->
    <section class="w-full py-32 px-6 md:px-12 lg:px-24 bg-black relative">
      <div class="max-w-7xl mx-auto text-center mb-24 relative z-10">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase">
          My Professional Journey
        </h2>
      </div>

      <!-- Vertical Line -->
      <div
        ref="timelineContainer"
        class="absolute top-62.5 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/20 z-0"
      >
        <div ref="timelineProgress" class="w-full h-0 bg-white"></div>
      </div>

      <div class="max-w-5xl mx-auto relative z-10 flex flex-col gap-24">
        <!-- Node 1 -->
        <div class="timeline-node flex flex-col md:flex-row w-full items-center justify-between">
          <div
            class="timeline-node-content w-full md:w-[45%] text-right pr-0 md:pr-12 mb-8 md:mb-0 order-2 md:order-1"
          >
            <span class="text-gray-500 text-sm tracking-widest mb-2 block">01</span>
            <h3 class="text-2xl md:text-4xl font-semibold mb-4 uppercase text-gray-200 title-text">
              FIFGROUP
            </h3>
            <p class="text-blue-500 font-medium mb-4 subtitle-text">May 2025 – Present</p>
            <p class="text-gray-500 font-light leading-relaxed body-text">
              Engineered high-stakes features using Spring Boot 3 and Angular v20+ for a B2B Dealer
              Financing & AHASS Sparepart Financing Platform. Executed framework migration to
              Angular 21, optimized build performance, and managed independent increments in
              OpenShift (OCP) environments.
            </p>
          </div>
          <div class="hidden md:flex w-[10%] justify-center order-2">
            <div
              class="timeline-dot w-4 h-4 rounded-full border-2 border-gray-400 bg-secondary ring-4 ring-black transition-all duration-300"
            ></div>
          </div>
          <div class="w-full md:w-[45%] order-1 md:order-3"></div>
        </div>

        <!-- Node 2 -->
        <div class="timeline-node flex flex-col md:flex-row w-full items-center justify-between">
          <div class="w-full md:w-[45%] order-2 md:order-1"></div>
          <div class="hidden md:flex w-[10%] justify-center order-2">
            <div
              class="timeline-dot w-4 h-4 rounded-full border-2 border-gray-400 bg-secondary ring-4 ring-black transition-all duration-300"
            ></div>
          </div>
          <div
            class="timeline-node-content w-full md:w-[45%] text-left pl-0 md:pl-12 mb-8 md:mb-0 order-1 md:order-3"
          >
            <span class="text-gray-500 text-sm tracking-widest mb-2 block">02</span>
            <h3 class="text-2xl md:text-4xl font-semibold mb-4 uppercase text-gray-200 title-text">
              PT Bank Mandiri Tbk
            </h3>
            <p class="text-blue-500 font-medium mb-4 subtitle-text">Feb 2024 – Dec 2024</p>
            <p class="text-gray-500 font-light leading-relaxed body-text">
              Engineered core Supply Chain Finance modules on Kopra By Mandiri using Angular and
              Tailwind CSS. Spearheaded the Supplier Onboarding feature, executed a critical
              platform migration from Angular 16 to 18, and automated frontend QA using Jasmine.
            </p>
          </div>
        </div>

        <!-- Node 3 -->
        <div class="timeline-node flex flex-col md:flex-row w-full items-center justify-between">
          <div
            class="timeline-node-content w-full md:w-[45%] text-right pr-0 md:pr-12 mb-8 md:mb-0 order-2 md:order-1"
          >
            <span class="text-gray-500 text-sm tracking-widest mb-2 block">03</span>
            <h3 class="text-2xl md:text-4xl font-semibold mb-4 uppercase text-gray-200 title-text">
              PT Bank Mandiri Tbk
            </h3>
            <p class="text-blue-500 font-medium mb-4 subtitle-text">Jan 2023 - Dec 2023</p>
            <p class="text-gray-500 font-light leading-relaxed body-text">
              Guaranteed system scalability for high-traffic corporate banking networks by executing
              rigorous performance testing. Diagnosed architecture bottlenecks using VuGen and
              LoadRunner, delivering data-driven insights to backend teams.
            </p>
          </div>
          <div class="hidden md:flex w-[10%] justify-center order-2">
            <div
              class="timeline-dot w-4 h-4 rounded-full border-2 border-gray-400 bg-secondary ring-4 ring-black transition-all duration-300"
            ></div>
          </div>
          <div class="w-full md:w-[45%] order-1 md:order-3"></div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="w-full py-32 px-6 md:px-12 lg:px-24 bg-secondary">
      <div class="max-w-7xl mx-auto">
        <div
          class="flex items-center gap-2 mb-6 text-sm tracking-[0.2em] uppercase text-gray-500 font-medium"
        >
          <span class="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
          HOW I WORK
        </div>
        <h2 class="text-4xl md:text-6xl font-semibold mb-8 tracking-tight">Design Process</h2>
        <p class="text-xl text-gray-400 font-light max-w-2xl mb-20 leading-relaxed">
          Rooted in robust architecture, clean code, and scalable deployments, my development
          process transforms business requirements into secure, high-performance platforms.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Card 1 -->
          <div
            class="bg-[#111] p-10 rounded-3xl border border-white/5 hover:bg-[#151515] hover:border-white/10 transition-all group"
          >
            <div
              class="w-12 h-12 rounded-xl bg-green-900/20 border border-green-500/20 flex items-center justify-center mb-8 text-green-500 group-hover:scale-110 transition-transform"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold mb-4">Discover</h3>
            <p class="text-gray-400 font-light leading-relaxed text-sm">
              Every project begins by uncovering technical constraints, business logic, and scaling
              requirements through thoughtful system design and architectural mapping.
            </p>
          </div>

          <!-- Card 2 -->
          <div
            class="bg-[#111] p-10 rounded-3xl border border-white/5 hover:bg-[#151515] hover:border-white/10 transition-all group"
          >
            <div
              class="w-12 h-12 rounded-xl bg-blue-900/20 border border-blue-500/20 flex items-center justify-center mb-8 text-blue-500 group-hover:scale-110 transition-transform"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                ></path>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold mb-4">Design</h3>
            <p class="text-gray-400 font-light leading-relaxed text-sm">
              From architecture to execution, code is written with clarity, intention, and
              performance in mind using Spring Boot, Angular, and PostgreSQL.
            </p>
          </div>

          <!-- Card 3 -->
          <div
            class="bg-[#111] p-10 rounded-3xl border border-white/5 hover:bg-[#151515] hover:border-white/10 transition-all group"
          >
            <div
              class="w-12 h-12 rounded-xl bg-orange-900/20 border border-orange-500/20 flex items-center justify-center mb-8 text-orange-500 group-hover:scale-110 transition-transform"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold mb-4">Deliver</h3>
            <p class="text-gray-400 font-light leading-relaxed text-sm">
              Fast, focused, and secure — scalable solutions delivered via CI/CD pipelines to
              OpenShift (OCP), ensuring momentum and stability never stall.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0) rotate(var(--tw-rotate));
  }
  50% {
    transform: translateY(-10px) rotate(var(--tw-rotate));
  }
}

/* Timeline Node Animations */
.timeline-node-content {
  opacity: 0.3;
  transform: scale(0.9);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.active-node .timeline-node-content {
  opacity: 1;
  transform: scale(1);
}

.active-node .title-text {
  color: white;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.active-node .subtitle-text {
  color: #60a5fa; /* blue-400 */
}

.active-node .body-text {
  color: #9ca3af; /* gray-400 */
}
</style>
