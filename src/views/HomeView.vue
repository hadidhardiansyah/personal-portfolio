<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero3D from '../components/Hero3D.vue'
import TypewriterHeadline from '../components/TypewriterHeadline.vue'

gsap.registerPlugin(ScrollTrigger)

const activeIntro = ref('Professional Summary')
const typedText = ref('')
const isTyping = ref(false)
let typingInterval: number | null = null

const marqueeRef = ref<HTMLElement | null>(null)
const set1Ref = ref<HTMLElement | null>(null)
const isHovered = ref(false)
let animationFrameId = 0

const animateMarquee = () => {
  if (marqueeRef.value && set1Ref.value) {
    // Width of one set plus the gap-6 (24px)
    const set1Width = set1Ref.value.offsetWidth + 24

    if (!isHovered.value) {
      marqueeRef.value.scrollLeft += 1
    }

    if (marqueeRef.value.scrollLeft >= set1Width) {
      marqueeRef.value.scrollLeft -= set1Width
    } else if (marqueeRef.value.scrollLeft <= 0 && isHovered.value) {
      marqueeRef.value.scrollLeft += set1Width
    }
  }
  animationFrameId = requestAnimationFrame(animateMarquee)
}

const typeText = (text: string) => {
  if (typingInterval) clearInterval(typingInterval)
  typedText.value = ''
  isTyping.value = true
  let i = 0

  // Kecepatan ketik (dalam milidetik per karakter)
  const typingSpeed = 15

  typingInterval = window.setInterval(() => {
    typedText.value += text.charAt(i)
    i++
    if (i >= text.length) {
      if (typingInterval) clearInterval(typingInterval)
      isTyping.value = false
    }
  }, typingSpeed)
}

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

  // Mulai animasi ketik untuk menu pertama saat halaman dimuat
  const firstOption = introOptions.find((o) => o.id === activeIntro.value)
  if (firstOption) {
    typeText(firstOption.text)
  }

  // Start marquee loop
  animationFrameId = requestAnimationFrame(animateMarquee)

  // Scroll Animations
  const animateLeftElements = document.querySelectorAll('.animate-fade-left')
  animateLeftElements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      x: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    })
  })

  const animateRightElements = document.querySelectorAll('.animate-fade-right')
  animateRightElements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      x: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    })
  })

  const animateUpElements = document.querySelectorAll('.animate-fade-up')
  animateUpElements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    })
  })
})

const handleMenuClick = (id: string) => {
  if (activeIntro.value === id) return
  activeIntro.value = id

  const selectedOption = introOptions.find((o) => o.id === id)
  if (selectedOption) {
    typeText(selectedOption.text)
  }
}

const introOptions = [
  {
    id: 'Professional Summary',
    file: '01_summary.ts',
    prefix:
      '<span class="text-emerald-500">const</span> <span class="text-blue-400">summary</span> = <span class="text-yellow-300">`</span>',
    suffix: '<span class="text-yellow-300">`</span>;',
    text: 'Software Engineer with 3+ years of experience in the banking and finance sectors (FIFGROUP & Bank Mandiri). I specialize in engineering secure, high-volume B2B financing systems using Spring Boot 3 and Angular (v16+). I have a proven track record in orchestrating enterprise API gateways and driving end-to-end product increments.',
  },
  {
    id: 'Frontend Expertise',
    file: '02_frontend.vue',
    prefix:
      '<span class="text-gray-500">&lt;</span><span class="text-emerald-500">template</span><span class="text-gray-500">&gt;</span><br>&nbsp;&nbsp;<span class="text-gray-500">&lt;</span><span class="text-blue-400">p</span><span class="text-gray-500">&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;',
    suffix:
      '<br>&nbsp;&nbsp;<span class="text-gray-500">&lt;/</span><span class="text-blue-400">p</span><span class="text-gray-500">&gt;</span><br><span class="text-gray-500">&lt;/</span><span class="text-emerald-500">template</span><span class="text-gray-500">&gt;</span>',
    text: 'Expertise in building scalable UIs with Angular (v16-v21), React JS, TypeScript, and Tailwind CSS. Successfully led critical framework migrations at Bank Mandiri and FIFGROUP, drastically optimizing bundle sizes, rendering performance, and long-term maintainability without breaking component compatibility.',
  },
  {
    id: 'Backend & Architecture',
    file: '03_backend.java',
    prefix:
      '<span class="text-emerald-500">String</span> <span class="text-blue-400">backendExperience</span> = <span class="text-yellow-300">"</span>',
    suffix: '<span class="text-yellow-300">"</span>;',
    text: 'Architect scalable backend microservices using Java 17+, Spring Boot 3, and PostgreSQL. Experienced in designing strict API contracts, processing large-scale transactions via Kafka, and seamlessly integrating with enterprise Order Management Systems through secure API Gateways.',
  },
  {
    id: 'DevOps & Testing',
    file: '04_devops.yml',
    prefix:
      '<span class="text-emerald-500">stages:</span><br>&nbsp;&nbsp;<span class="text-blue-400">description:</span> <span class="text-yellow-300">></span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-gray-300">',
    suffix: '</span>',
    text: "Strong advocate for the 'You Build It, You Run It' culture. Proficient in managing CI/CD pipelines, deploying increments on OpenShift (OCP), and ensuring robust code quality via SonarQube, JUnit, Mockito, and Jasmine automated testing.",
  },
]
</script>

<template>
  <main class="w-full min-h-screen relative overflow-x-hidden">
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

    <!-- The Blueprint Section (Interactive IDE) -->
    <section
      id="about"
      class="w-full bg-black/40 backdrop-blur-sm text-white py-16 lg:py-32 px-6 md:px-12 lg:px-24 border-t border-white/5"
    >
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Sidebar Menu (File Explorer) -->
        <div class="lg:col-span-3">
          <div class="flex items-center gap-3 mb-10">
            <h2 class="text-3xl md:text-5xl font-bold tracking-tight">The Blueprint</h2>
            <span class="w-3 h-5 bg-emerald-500 animate-pulse block mt-2"></span>
          </div>

          <div class="mb-4 text-xs font-mono text-gray-500 uppercase tracking-widest pl-2">
            Explorer > Portfolio
          </div>

          <ul class="flex flex-col font-mono text-sm">
            <li
              v-for="option in introOptions"
              :key="option.id"
              @click="handleMenuClick(option.id)"
              class="group flex items-center gap-3 cursor-pointer transition-all duration-200 py-2.5 px-4 rounded-md"
              :class="
                activeIntro === option.id
                  ? 'bg-white/10 text-white border-l-2 border-emerald-500'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border-l-2 border-transparent'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 opacity-70"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              <span class="tracking-wide">{{ option.file }}</span>
            </li>
          </ul>
        </div>

        <!-- Content Card (Code Editor Window) -->
        <div class="lg:col-span-9 pt-4 lg:pt-0" ref="contentCardWrapper">
          <div
            class="bg-[#121212] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-full min-h-[350px]"
          >
            <!-- IDE Top Bar -->
            <div class="bg-[#1a1a1a] border-b border-white/5 px-4 flex items-center h-12">
              <div class="flex gap-2 mr-6">
                <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div class="flex h-full">
                <div
                  class="px-6 h-full flex items-center bg-[#121212] border-t border-emerald-500 text-sm font-mono text-gray-300"
                >
                  {{ introOptions.find((o) => o.id === activeIntro)?.file }}
                </div>
              </div>
            </div>

            <!-- IDE Content Area -->
            <div class="p-5 md:p-12 relative flex-grow flex items-center overflow-hidden">
              <!-- Line Numbers -->
              <div
                class="absolute left-0 top-0 bottom-0 w-12 bg-black/20 border-r border-white/5 hidden md:flex flex-col py-12 items-center text-xs font-mono text-gray-700 select-none"
              >
                <span v-for="i in 10" :key="i">{{ i }}</span>
              </div>

              <!-- Main Text -->
              <div class="pl-2 md:pl-8 relative w-full">
                <transition name="fade" mode="out-in">
                  <p
                    :key="activeIntro"
                    class="text-base md:text-xl lg:text-2xl font-light leading-relaxed text-gray-300 font-mono tracking-tight break-words"
                  >
                    <!-- Prefix (Syntax Highlight) -->
                    <span
                      v-html="introOptions.find((o) => o.id === activeIntro)?.prefix || ''"
                    ></span>

                    <!-- Typed Text -->
                    <span class="text-gray-300">{{ typedText }}</span>

                    <!-- Blinking Cursor -->
                    <span
                      v-if="isTyping"
                      class="inline-block w-2 md:w-2.5 h-4 md:h-6 bg-emerald-500 animate-pulse align-middle ml-1"
                    ></span>

                    <!-- Suffix (Syntax Highlight) -->
                    <span
                      v-html="introOptions.find((o) => o.id === activeIntro)?.suffix || ''"
                    ></span>
                  </p>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Enterprise Experience Section -->
    <section
      class="w-full bg-black/40 backdrop-blur-sm text-white py-16 lg:py-32 px-6 md:px-12 lg:px-24 border-t border-white/5"
    >
      <div class="max-w-7xl mx-auto">
        <div class="mb-16">
          <div
            class="flex items-center gap-3 mb-6 text-emerald-500 text-sm tracking-widest uppercase"
          >
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Since 2023
          </div>
          <h2 class="text-5xl md:text-7xl font-semibold tracking-tight mb-8">
            Enterprise Experience
          </h2>
          <p class="text-xl md:text-2xl text-gray-400 font-light max-w-2xl leading-relaxed">
            I architect scalable platforms and resilient backends to power mission-critical
            services.
          </p>
        </div>

        <!-- Project 1: FinForm -->
        <div class="mb-24">
          <a
            href="https://finform.fifgroup.co.id/"
            target="_blank"
            class="animate-fade-left project-card group cursor-pointer w-full bg-emerald-400/10 rounded-4xl p-8 md:p-16 flex flex-col items-center justify-center gap-12 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(52,211,153,0.1)] transition-all duration-500 overflow-hidden relative border border-emerald-500/20 block"
          >
            <div
              class="absolute top-6 left-8 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full text-emerald-400 text-sm font-medium z-10 border border-emerald-500/30"
            >
              01 / 02
            </div>
            <!-- Visit Icon -->
            <div
              class="absolute top-6 right-8 bg-black/40 backdrop-blur-md p-2 rounded-full text-emerald-400 z-10 border border-emerald-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </div>
            <div class="w-full relative z-10 pt-10 pb-6 flex justify-center md:justify-start">
              <!-- Hyper-Realistic MacBook Frame (Desktop) -->
              <div
                class="relative w-[90%] md:w-[85%] mx-auto md:ml-4 group-hover:scale-105 group-hover:-translate-y-2 group-hover:rotate-1 transition-all duration-700 z-10 drop-shadow-2xl"
              >
                <!-- Lid Outer Edge (Metallic) -->
                <div
                  class="bg-gradient-to-b from-[#e5e7eb] to-[#9ca3af] p-[1.5px] md:p-[2px] rounded-t-2xl md:rounded-t-[2rem] rounded-b-sm"
                >
                  <!-- Inner Bezel (Black) -->
                  <div
                    class="bg-[#111] p-2 md:p-3 rounded-t-[1.1rem] md:rounded-t-[1.8rem] rounded-b-sm relative flex flex-col items-center shadow-[inset_0_0_10px_rgba(0,0,0,1)]"
                  >
                    <!-- Camera -->
                    <div
                      class="absolute top-1 md:top-1.5 w-1 h-1 md:w-1.5 md:h-1.5 bg-black rounded-full border border-[#333] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]"
                    ></div>
                    <!-- Screen Area (No crop) -->
                    <img
                      src="/images/finform-desktop.png"
                      alt="FinForm Desktop View"
                      class="w-full h-auto bg-black rounded-sm border border-[#222]"
                    />
                    <!-- Bottom Bezel Space -->
                    <div class="h-2 md:h-3 w-full"></div>
                  </div>
                </div>
                <!-- Base Chassis (Keyboard Deck Front Edge) -->
                <div
                  class="relative w-[114%] -ml-[7%] h-2.5 md:h-3 bg-gradient-to-b from-[#f3f4f6] to-[#9ca3af] rounded-b-xl border-t border-[#fff] shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex justify-center z-20"
                >
                  <!-- Thumb Groove -->
                  <div
                    class="w-[15%] h-1 md:h-1.5 bg-gradient-to-b from-[#d1d5db] to-[#6b7280] rounded-b-md shadow-inner"
                  ></div>
                </div>
              </div>

              <!-- Hyper-Realistic iPhone Frame (Mobile) -->
              <div
                class="absolute -bottom-8 right-[2%] md:right-[5%] w-[30%] md:w-[22%] max-w-[140px] md:max-w-[180px] group-hover:scale-110 group-hover:-translate-y-8 group-hover:-rotate-3 transition-all duration-700 z-30 drop-shadow-2xl"
              >
                <!-- Outer Metallic Band -->
                <div
                  class="bg-gradient-to-tr from-[#94a3b8] via-[#e2e8f0] to-[#64748b] p-[2px] md:p-[3px] rounded-[1.8rem] md:rounded-[2.5rem] shadow-[0_25px_50px_rgba(0,0,0,0.9)] relative"
                >
                  <!-- Inner Black Bezel -->
                  <div
                    class="bg-black p-1.5 md:p-2 rounded-[1.7rem] md:rounded-[2.3rem] relative flex flex-col items-center"
                  >
                    <!-- Dynamic Island / Sensor Notch -->
                    <div
                      class="absolute top-2.5 md:top-3.5 w-[35%] h-2.5 md:h-3.5 bg-black rounded-full z-40 flex items-center justify-end px-1 shadow-[inset_0_0_2px_rgba(255,255,255,0.1)] border border-[#222]"
                    >
                      <div
                        class="w-1.5 h-1.5 bg-[#0f0f0f] rounded-full shadow-[inset_0_0_1px_rgba(255,255,255,0.6)]"
                      ></div>
                    </div>
                    <!-- Screen Area (No crop) -->
                    <div
                      class="w-full h-auto overflow-hidden rounded-[1.3rem] md:rounded-[1.9rem] border border-[#111] bg-black"
                    >
                      <img
                        src="/images/finform-mobile.png"
                        alt="FinForm Mobile View"
                        class="w-full h-auto"
                      />
                    </div>
                  </div>
                  <!-- Side Buttons (Volume / Power) -->
                  <div
                    class="absolute left-[-2px] top-[20%] w-[2px] h-4 bg-[#94a3b8] rounded-l-md"
                  ></div>
                  <div
                    class="absolute left-[-2px] top-[30%] w-[2px] h-8 bg-[#94a3b8] rounded-l-md"
                  ></div>
                  <div
                    class="absolute right-[-2px] top-[30%] w-[2px] h-10 bg-[#94a3b8] rounded-r-md"
                  ></div>
                </div>
              </div>
            </div>
          </a>
          <div
            class="mt-8 px-4 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div>
              <p class="text-sm text-gray-500 tracking-[0.2em] uppercase mb-2">
                Fullstack Development | FIFGROUP
              </p>
              <a
                href="https://finform.fifgroup.co.id/"
                target="_blank"
                class="text-3xl font-medium hover:text-emerald-400 transition-colors cursor-pointer"
              >
                FinForm B2B Financing ↗
              </a>
            </div>
            <p class="text-gray-400 max-w-md mt-4 md:mt-0 text-sm leading-relaxed">
              Engineered scalable backend services using Spring Boot 3, and migrated frontend
              workflows from Angular 20 to 21 for a Dealer & Sparepart Financing Platform.
            </p>
          </div>
        </div>

        <!-- Project 2: Kopra By Mandiri -->
        <div>
          <a
            href="https://koprabymandiri.com/"
            target="_blank"
            class="animate-fade-right project-card group cursor-pointer w-full bg-blue-400/10 rounded-4xl p-8 md:p-16 flex flex-col items-center justify-center gap-12 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(96,165,250,0.1)] transition-all duration-500 overflow-hidden relative border border-blue-500/20 block"
          >
            <div
              class="absolute top-6 left-8 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full text-blue-400 text-sm font-medium z-10 border border-blue-500/30"
            >
              02 / 02
            </div>
            <!-- Visit Icon -->
            <div
              class="absolute top-6 right-8 bg-black/40 backdrop-blur-md p-2 rounded-full text-blue-400 z-10 border border-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </div>
            <div class="w-full relative z-10 pt-10 pb-6 flex justify-center md:justify-start">
              <!-- Hyper-Realistic MacBook Frame (Desktop) -->
              <div
                class="relative w-[90%] md:w-[85%] mx-auto md:ml-4 group-hover:scale-105 group-hover:-translate-y-2 group-hover:rotate-1 transition-all duration-700 z-10 drop-shadow-2xl"
              >
                <!-- Lid Outer Edge (Metallic) -->
                <div
                  class="bg-gradient-to-b from-[#e5e7eb] to-[#9ca3af] p-[1.5px] md:p-[2px] rounded-t-2xl md:rounded-t-[2rem] rounded-b-sm"
                >
                  <!-- Inner Bezel (Black) -->
                  <div
                    class="bg-[#111] p-2 md:p-3 rounded-t-[1.1rem] md:rounded-t-[1.8rem] rounded-b-sm relative flex flex-col items-center shadow-[inset_0_0_10px_rgba(0,0,0,1)]"
                  >
                    <!-- Camera -->
                    <div
                      class="absolute top-1 md:top-1.5 w-1 h-1 md:w-1.5 md:h-1.5 bg-black rounded-full border border-[#333] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]"
                    ></div>
                    <!-- Screen Area (No crop) -->
                    <img
                      src="/images/kopra-desktop.png"
                      alt="Kopra Desktop View"
                      class="w-full h-auto bg-black rounded-sm border border-[#222]"
                    />
                    <!-- Bottom Bezel Space -->
                    <div class="h-2 md:h-3 w-full"></div>
                  </div>
                </div>
                <!-- Base Chassis (Keyboard Deck Front Edge) -->
                <div
                  class="relative w-[114%] -ml-[7%] h-2.5 md:h-3 bg-gradient-to-b from-[#f3f4f6] to-[#9ca3af] rounded-b-xl border-t border-[#fff] shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex justify-center z-20"
                >
                  <!-- Thumb Groove -->
                  <div
                    class="w-[15%] h-1 md:h-1.5 bg-gradient-to-b from-[#d1d5db] to-[#6b7280] rounded-b-md shadow-inner"
                  ></div>
                </div>
              </div>

              <!-- Hyper-Realistic iPhone Frame (Mobile) -->
              <div
                class="absolute -bottom-8 right-[2%] md:right-[5%] w-[30%] md:w-[22%] max-w-[140px] md:max-w-[180px] group-hover:scale-110 group-hover:-translate-y-8 group-hover:-rotate-3 transition-all duration-700 z-30 drop-shadow-2xl"
              >
                <!-- Outer Metallic Band -->
                <div
                  class="bg-gradient-to-tr from-[#94a3b8] via-[#e2e8f0] to-[#64748b] p-[2px] md:p-[3px] rounded-[1.8rem] md:rounded-[2.5rem] shadow-[0_25px_50px_rgba(0,0,0,0.9)] relative"
                >
                  <!-- Inner Black Bezel -->
                  <div
                    class="bg-black p-1.5 md:p-2 rounded-[1.7rem] md:rounded-[2.3rem] relative flex flex-col items-center"
                  >
                    <!-- Dynamic Island / Sensor Notch -->
                    <div
                      class="absolute top-2.5 md:top-3.5 w-[35%] h-2.5 md:h-3.5 bg-black rounded-full z-40 flex items-center justify-end px-1 shadow-[inset_0_0_2px_rgba(255,255,255,0.1)] border border-[#222]"
                    >
                      <div
                        class="w-1.5 h-1.5 bg-[#0f0f0f] rounded-full shadow-[inset_0_0_1px_rgba(255,255,255,0.6)]"
                      ></div>
                    </div>
                    <!-- Screen Area (No crop) -->
                    <div
                      class="w-full h-auto overflow-hidden rounded-[1.3rem] md:rounded-[1.9rem] border border-[#111] bg-black"
                    >
                      <img
                        src="/images/kopra-mobile.png"
                        alt="Kopra Mobile View"
                        class="w-full h-auto"
                      />
                    </div>
                  </div>
                  <!-- Side Buttons (Volume / Power) -->
                  <div
                    class="absolute left-[-2px] top-[20%] w-[2px] h-4 bg-[#94a3b8] rounded-l-md"
                  ></div>
                  <div
                    class="absolute left-[-2px] top-[30%] w-[2px] h-8 bg-[#94a3b8] rounded-l-md"
                  ></div>
                  <div
                    class="absolute right-[-2px] top-[30%] w-[2px] h-10 bg-[#94a3b8] rounded-r-md"
                  ></div>
                </div>
              </div>
            </div>
          </a>
          <div
            class="mt-8 px-4 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div>
              <p class="text-sm text-gray-500 tracking-[0.2em] uppercase mb-2">
                Frontend Development | Bank Mandiri
              </p>
              <a
                href="https://koprabymandiri.com/"
                target="_blank"
                class="text-3xl font-medium hover:text-blue-400 transition-colors cursor-pointer"
              >
                Kopra By Mandiri ↗
              </a>
            </div>
            <p class="text-gray-400 max-w-md mt-4 md:mt-0 text-sm leading-relaxed">
              Engineered core Supply Chain Finance modules focusing on frontend workflows using
              Angular TypeScript and Tailwind CSS for corporate Wholesale Banking.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Startup Experience Section (Bento Box) -->
    <section
      class="w-full bg-black/40 backdrop-blur-sm text-white py-16 lg:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden border-t border-white/5"
    >
      <!-- Ambient Glows -->
      <div
        class="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"
      ></div>
      <div
        class="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"
      ></div>

      <!-- Subtle Dot Pattern -->
      <div
        class="absolute inset-0 opacity-[0.03] pointer-events-none"
        style="
          background-image: radial-gradient(white 1px, transparent 1px);
          background-size: 32px 32px;
        "
      ></div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="mb-16">
          <div
            class="flex items-center gap-3 mb-6 text-gray-400 text-sm tracking-widest uppercase font-medium"
          >
            <span
              class="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
            ></span>
            Startup Venture
          </div>
          <h2
            class="text-5xl md:text-7xl font-semibold tracking-tight mb-8 text-white drop-shadow-sm"
          >
            Startup Experience
          </h2>
          <p class="text-xl md:text-2xl text-gray-400 font-light max-w-2xl leading-relaxed">
            Building software is my profession. Building scalable businesses is my passion.
          </p>
        </div>

        <!-- Bento Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Box 1: Big Project Image -->
          <a
            href="https://www.geniago.id/"
            target="_blank"
            class="animate-fade-left project-card block md:col-span-2 md:row-span-2 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-white/20 transition-all duration-700 shadow-[0_8px_30px_rgb(0,0,0,0.5)] min-h-[400px]"
          >
            <!-- Inner ambient light -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            ></div>

            <div class="relative z-10 flex flex-col h-full">
              <span
                class="text-3xl md:text-4xl font-medium mb-3 text-white transition-colors inline-block w-fit"
              >
                Genia OS ↗
              </span>
              <p class="text-gray-400 text-base md:text-lg max-w-md mb-12">
                A scalable multi-tenant SaaS F&B Point of Sales and Business Companion ecosystem
                processing hundreds of live daily transactions.
              </p>

              <!-- Floating UI Mockup inside Box -->
              <div class="flex-grow relative w-full mt-8 block pb-6">
                <!-- Hyper-Realistic MacBook Frame (Desktop) -->
                <div
                  class="relative w-[95%] md:w-[90%] mx-auto group-hover:scale-105 group-hover:-translate-y-2 group-hover:rotate-1 transition-all duration-700 z-10 drop-shadow-2xl"
                >
                  <!-- Lid Outer Edge (Metallic) -->
                  <div
                    class="bg-gradient-to-b from-[#e5e7eb] to-[#9ca3af] p-[1.5px] md:p-[2px] rounded-t-2xl md:rounded-t-[2rem] rounded-b-sm"
                  >
                    <!-- Inner Bezel (Black) -->
                    <div
                      class="bg-[#111] p-2 md:p-3 rounded-t-[1.1rem] md:rounded-t-[1.8rem] rounded-b-sm relative flex flex-col items-center shadow-[inset_0_0_10px_rgba(0,0,0,1)]"
                    >
                      <!-- Camera -->
                      <div
                        class="absolute top-1 md:top-1.5 w-1 h-1 md:w-1.5 md:h-1.5 bg-black rounded-full border border-[#333] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]"
                      ></div>
                      <!-- Screen Area (No crop) -->
                      <img
                        src="/images/genia-desktop.png"
                        alt="Genia Desktop View"
                        class="w-full h-auto bg-black rounded-sm border border-[#222]"
                      />
                      <!-- Bottom Bezel Space -->
                      <div class="h-2 md:h-3 w-full"></div>
                    </div>
                  </div>
                  <!-- Base Chassis -->
                  <div
                    class="relative w-[114%] -ml-[7%] h-2.5 md:h-3 bg-gradient-to-b from-[#f3f4f6] to-[#9ca3af] rounded-b-xl border-t border-[#fff] shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex justify-center z-20"
                  >
                    <div
                      class="w-[15%] h-1 md:h-1.5 bg-gradient-to-b from-[#d1d5db] to-[#6b7280] rounded-b-md shadow-inner"
                    ></div>
                  </div>
                </div>

                <!-- Hyper-Realistic iPhone Frame (Mobile) -->
                <div
                  class="absolute -bottom-6 right-[-2%] md:right-[2%] w-[35%] md:w-[25%] max-w-[140px] md:max-w-[160px] group-hover:scale-110 group-hover:-translate-y-8 group-hover:-rotate-3 transition-all duration-700 z-30 drop-shadow-2xl"
                >
                  <!-- Outer Metallic Band -->
                  <div
                    class="bg-gradient-to-tr from-[#94a3b8] via-[#e2e8f0] to-[#64748b] p-[2px] md:p-[3px] rounded-[1.8rem] md:rounded-[2.5rem] shadow-[0_25px_50px_rgba(0,0,0,0.9)] relative"
                  >
                    <!-- Inner Black Bezel -->
                    <div
                      class="bg-black p-1.5 md:p-2 rounded-[1.7rem] md:rounded-[2.3rem] relative flex flex-col items-center"
                    >
                      <!-- Dynamic Island / Sensor Notch -->
                      <div
                        class="absolute top-2.5 md:top-3.5 w-[35%] h-2.5 md:h-3.5 bg-black rounded-full z-40 flex items-center justify-end px-1 shadow-[inset_0_0_2px_rgba(255,255,255,0.1)] border border-[#222]"
                      >
                        <div
                          class="w-1.5 h-1.5 bg-[#0f0f0f] rounded-full shadow-[inset_0_0_1px_rgba(255,255,255,0.6)]"
                        ></div>
                      </div>
                      <!-- Screen Area (No crop) -->
                      <div
                        class="w-full h-auto overflow-hidden rounded-[1.3rem] md:rounded-[1.9rem] border border-[#111] bg-black"
                      >
                        <img
                          src="/images/genia-mobile.png"
                          alt="Genia Mobile View"
                          class="w-full h-auto"
                        />
                      </div>
                    </div>
                    <!-- Side Buttons -->
                    <div
                      class="absolute left-[-2px] top-[20%] w-[2px] h-4 bg-[#94a3b8] rounded-l-md"
                    ></div>
                    <div
                      class="absolute left-[-2px] top-[30%] w-[2px] h-8 bg-[#94a3b8] rounded-l-md"
                    ></div>
                    <div
                      class="absolute right-[-2px] top-[30%] w-[2px] h-10 bg-[#94a3b8] rounded-r-md"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </a>

          <!-- Box 2: CTO Badge -->
          <div
            class="animate-fade-right relative bg-gradient-to-b from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-center items-center text-center group hover:border-white/30 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 overflow-hidden cursor-crosshair"
          >
            <!-- Glass reflection sweep -->
            <div
              class="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"
            ></div>

            <div
              class="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center mb-8 border border-gray-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner relative z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-10 h-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3
              class="text-3xl font-bold text-white mb-3 tracking-wide relative z-10 drop-shadow-md"
            >
              CTO &<br />Co-Founder
            </h3>
            <p
              class="text-white text-xs font-bold tracking-widest uppercase mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 relative z-10 shadow-sm"
            >
              Apr 2026 – Present
            </p>
            <p class="text-gray-400 text-sm leading-relaxed max-w-[220px] relative z-10">
              Leading technical vision, merchant routing, and scalable data architecture.
            </p>
          </div>

          <!-- Box 3: Stack -->
          <div
            class="animate-fade-right bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col hover:border-white/20 transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
          >
            <h3 class="text-xl font-medium mb-6 text-white drop-shadow-sm">Tech Stack</h3>
            <div class="flex flex-col gap-4">
              <!-- Item 1: Next.js & Supabase -->
              <div
                class="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-white/20 hover:bg-white/[0.08] hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer group/item relative overflow-hidden"
              >
                <div class="flex items-center gap-4 relative z-10">
                  <div
                    class="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center text-white border border-white/10 group-hover/item:border-emerald-400/50 group-hover/item:text-emerald-400 transition-all duration-300 shadow-inner group-hover/item:shadow-[0_0_15px_rgba(52,211,153,0.3)] group-hover/item:rotate-6"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-white font-medium text-base">Next.js & Supabase</h4>
                    <p
                      class="text-xs text-gray-400 group-hover/item:text-gray-300 transition-colors"
                    >
                      Frontend & Auth
                    </p>
                  </div>
                </div>
                <div
                  class="text-white/20 group-hover/item:text-white group-hover/item:translate-x-1 transition-all duration-300"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </div>

              <!-- Item 2: PostgreSQL -->
              <div
                class="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-white/20 hover:bg-white/[0.08] hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer group/item relative overflow-hidden"
              >
                <div class="flex items-center gap-4 relative z-10">
                  <div
                    class="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center text-white border border-white/10 group-hover/item:border-blue-400/50 group-hover/item:text-blue-400 transition-all duration-300 shadow-inner group-hover/item:shadow-[0_0_15px_rgba(96,165,250,0.3)] group-hover/item:rotate-6"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-white font-medium text-base">PostgreSQL</h4>
                    <p
                      class="text-xs text-gray-400 group-hover/item:text-gray-300 transition-colors"
                    >
                      Relational DB
                    </p>
                  </div>
                </div>
                <div
                  class="text-white/20 group-hover/item:text-white group-hover/item:translate-x-1 transition-all duration-300"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </div>

              <!-- Item 3: Xendit -->
              <div
                class="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-white/20 hover:bg-white/[0.08] hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer group/item relative overflow-hidden"
              >
                <div class="flex items-center gap-4 relative z-10">
                  <div
                    class="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center text-white border border-white/10 group-hover/item:border-purple-400/50 group-hover/item:text-purple-400 transition-all duration-300 shadow-inner group-hover/item:shadow-[0_0_15px_rgba(192,132,252,0.3)] group-hover/item:rotate-6"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-white font-medium text-base">Xendit Gateway</h4>
                    <p
                      class="text-xs text-gray-400 group-hover/item:text-gray-300 transition-colors"
                    >
                      Payments
                    </p>
                  </div>
                </div>
                <div
                  class="text-white/20 group-hover/item:text-white group-hover/item:translate-x-1 transition-all duration-300"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Selected Projects Section -->
    <section
      class="w-full bg-black/40 backdrop-blur-sm text-white py-16 lg:py-32 px-6 md:px-12 lg:px-24 border-t border-white/5"
    >
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        <!-- Left Text -->
        <div class="animate-fade-left lg:w-1/3">
          <div class="flex items-center gap-3 mb-6 text-blue-400 text-sm tracking-widest uppercase">
            <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Since 2022
          </div>
          <h2 class="text-5xl md:text-7xl font-semibold tracking-tight mb-8">Selected Projects</h2>
          <p class="text-xl text-gray-400 font-light leading-relaxed mb-12">
            A space for side-projects, fullstack prototypes, and technical experiments driven by
            curiosity, code, and fast iteration.
          </p>
          <RouterLink
            to="/projects"
            class="text-sm text-gray-500 hover:text-white transition-colors tracking-widest uppercase flex items-center gap-2 w-fit group"
          >
            View All Projects
            <span class="group-hover:translate-x-2 transition-transform">â†’</span>
          </RouterLink>
        </div>

        <!-- Right Grid -->
        <div class="animate-fade-right lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <!-- Item 1 -->
          <div class="flex flex-col gap-6">
            <div
              class="project-card group cursor-pointer bg-blue-900/20 border border-blue-500/20 rounded-4xl aspect-4/3 overflow-hidden relative hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] transition-all duration-500"
            >
              <img
                src="/images/bsn/3-bsn-home.png"
                class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                alt="Book Social Network"
              />
              <div
                class="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium border border-white/10 text-white"
              >
                Social Network
              </div>
            </div>
            <div class="px-2">
              <h3
                class="text-2xl font-medium mb-2 group-hover:text-blue-400 transition-colors cursor-pointer"
              >
                Book Social Network
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
                src="/images/bills-food/1-home.png"
                class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                alt="Bills Food"
              />
              <div
                class="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium border border-white/10 text-white"
              >
                Multi-Restaurant Platform
              </div>
            </div>
            <div class="px-2">
              <h3
                class="text-2xl font-medium mb-2 group-hover:text-fuchsia-400 transition-colors cursor-pointer"
              >
                Bills Food
              </h3>
              <p class="text-gray-500 text-sm">React 19, Spring Boot, MySQL</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Technologies Section -->
    <section class="w-full bg-transparent text-white py-16 lg:py-32 overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-16 text-center">
        <!-- Section Header -->
        <div
          class="flex items-center justify-center gap-3 mb-6 text-gray-500 text-sm tracking-widest uppercase"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          Tech Stack
        </div>
        <h2 class="text-4xl md:text-6xl font-semibold tracking-tight mb-6">Core Technologies</h2>
        <p class="text-lg text-gray-400 font-light max-w-2xl mx-auto">
          The essential tools and frameworks I rely on to build secure, highly available, and
          scalable systems.
        </p>
      </div>

      <!-- Marquee Container (JS Driven Native Scroll) -->
      <div
        ref="marqueeRef"
        class="relative w-full flex overflow-x-auto hide-scrollbar group py-10"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        @touchstart="isHovered = true"
        @touchend="isHovered = false"
      >
        <div class="flex gap-6 w-max pl-6 md:pl-12 lg:pl-24">
          <!-- We render 2 identical sets to make the loop seamless -->
          <!-- SET 1 -->
          <div ref="set1Ref" class="flex gap-6 items-center">
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-white/20 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/java.svg" class="w-14 h-14 mb-4" alt="Java" />
              <span class="text-sm text-gray-400 font-medium">Java 17+</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-emerald-500/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/springboot.svg" class="w-14 h-14 mb-4" alt="Spring Boot" />
              <span class="text-sm text-gray-400 font-medium">Spring Boot</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-red-500/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/angular-v17.svg" class="w-14 h-14 mb-4" alt="Angular" />
              <span class="text-sm text-gray-400 font-medium">Angular</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-emerald-400/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/vuedotjs.svg" class="w-14 h-14 mb-4" alt="Vue" />
              <span class="text-sm text-gray-400 font-medium">Vue.js</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-blue-400/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/react.svg" class="w-14 h-14 mb-4" alt="React" />
              <span class="text-sm text-gray-400 font-medium">React</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-blue-500/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/postgresql.svg" class="w-14 h-14 mb-4" alt="PostgreSQL" />
              <span class="text-sm text-gray-400 font-medium">PostgreSQL</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-red-500/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/redhatopenshift.svg" class="w-14 h-14 mb-4" alt="OpenShift" />
              <span class="text-sm text-gray-400 font-medium">OpenShift</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-sky-400/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/tailwindcss.svg" class="w-14 h-14 mb-4" alt="Tailwind" />
              <span class="text-sm text-gray-400 font-medium">Tailwind CSS</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-blue-500/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/docker.svg" class="w-14 h-14 mb-4" alt="Docker" />
              <span class="text-sm text-gray-400 font-medium">Docker</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-blue-600/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/kubernetes.svg" class="w-14 h-14 mb-4" alt="Kubernetes" />
              <span class="text-sm text-gray-400 font-medium">Kubernetes</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-gray-300/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/apachekafka.svg" class="w-14 h-14 mb-4" alt="Kafka" />
              <span class="text-sm text-gray-400 font-medium">Apache Kafka</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-orange-500/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/git.svg" class="w-14 h-14 mb-4" alt="Git" />
              <span class="text-sm text-gray-400 font-medium">Git</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-white/20 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/nextdotjs.svg" class="w-14 h-14 mb-4 opacity-90" alt="Next.js" />
              <span class="text-sm text-gray-400 font-medium">Next.js</span>
            </div>
          </div>
          <!-- SET 2 (Exact Duplicate for Seamless Loop) -->
          <div class="flex gap-6 items-center">
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-white/20 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/java.svg" class="w-14 h-14 mb-4" alt="Java" />
              <span class="text-sm text-gray-400 font-medium">Java 17+</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-emerald-500/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/springboot.svg" class="w-14 h-14 mb-4" alt="Spring Boot" />
              <span class="text-sm text-gray-400 font-medium">Spring Boot</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-red-500/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/angular-v17.svg" class="w-14 h-14 mb-4" alt="Angular" />
              <span class="text-sm text-gray-400 font-medium">Angular</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-emerald-400/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/vuedotjs.svg" class="w-14 h-14 mb-4" alt="Vue" />
              <span class="text-sm text-gray-400 font-medium">Vue.js</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-blue-400/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/react.svg" class="w-14 h-14 mb-4" alt="React" />
              <span class="text-sm text-gray-400 font-medium">React</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-blue-500/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/postgresql.svg" class="w-14 h-14 mb-4" alt="PostgreSQL" />
              <span class="text-sm text-gray-400 font-medium">PostgreSQL</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-red-500/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/redhatopenshift.svg" class="w-14 h-14 mb-4" alt="OpenShift" />
              <span class="text-sm text-gray-400 font-medium">OpenShift</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-sky-400/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/tailwindcss.svg" class="w-14 h-14 mb-4" alt="Tailwind" />
              <span class="text-sm text-gray-400 font-medium">Tailwind CSS</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-blue-500/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/docker.svg" class="w-14 h-14 mb-4" alt="Docker" />
              <span class="text-sm text-gray-400 font-medium">Docker</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-blue-600/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/kubernetes.svg" class="w-14 h-14 mb-4" alt="Kubernetes" />
              <span class="text-sm text-gray-400 font-medium">Kubernetes</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-gray-300/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/apachekafka.svg" class="w-14 h-14 mb-4" alt="Kafka" />
              <span class="text-sm text-gray-400 font-medium">Apache Kafka</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-orange-500/30 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/git.svg" class="w-14 h-14 mb-4" alt="Git" />
              <span class="text-sm text-gray-400 font-medium">Git</span>
            </div>
            <div
              class="w-40 h-40 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-white/20 hover:bg-[#1a1a1a]/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <img src="/icons/nextdotjs.svg" class="w-14 h-14 mb-4 opacity-90" alt="Next.js" />
              <span class="text-sm text-gray-400 font-medium">Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped></style>

<style>
.hide-scrollbar {
  -ms-overflow-style: none !important; /* IE and Edge */
  scrollbar-width: none !important; /* Firefox */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none !important; /* Chrome, Safari and Opera */
  width: 0 !important;
  height: 0 !important;
}

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
