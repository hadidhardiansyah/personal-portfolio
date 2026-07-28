<script setup lang="ts">
import { ref, computed } from 'vue'

const projects = ref([
  {
    id: 1,
    title: 'Book Management App',
    category: 'Fullstack',
    image:
      'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop',
    tags: ['Angular 19', 'Spring Boot', 'PostgreSQL'],
    link: '#',
  },
  {
    id: 2,
    title: 'Food Stall Website',
    category: 'Fullstack',
    image:
      'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop',
    tags: ['React TS', 'Java', 'MySQL'],
    link: '#',
  },
  {
    id: 3,
    title: 'Supply Chain Finance Dashboard',
    category: 'Frontend',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    tags: ['Angular', 'Tailwind', 'Jasmine'],
    link: '#',
  },
  {
    id: 4,
    title: 'High-Traffic Banking Network',
    category: 'Backend',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
    tags: ['Spring Boot 3', 'Microservices', 'LoadRunner'],
    link: '#',
  },
])

const activeCategory = ref('All')

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') return projects.value
  return projects.value.filter(
    (p) =>
      p.category === activeCategory.value ||
      p.tags.some((tag) => tag.includes(activeCategory.value)),
  )
})

const getCount = (cat: string) => {
  if (cat === 'All') return projects.value.length
  return projects.value.filter((p) => p.category === cat || p.tags.some((tag) => tag.includes(cat)))
    .length
}
</script>

<template>
  <main class="w-full min-h-screen bg-secondary text-white pt-32 pb-24 px-6 md:px-12 lg:px-24">
    <div class="max-w-7xl mx-auto">
      <!-- Back Link -->
      <div class="flex justify-center mb-16">
        <RouterLink
          to="/"
          class="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm tracking-widest uppercase"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Home
        </RouterLink>
      </div>

      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-6xl md:text-8xl font-medium tracking-tight mb-8">Projects</h1>
        <p class="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
          Product engineering, scalable architectures, and seamless interfaces — everything in one
          place.
        </p>
      </div>

      <!-- Filter Chips -->
      <div class="flex flex-wrap justify-center gap-3 mb-20">
        <button
          @click="activeCategory = 'All'"
          :class="[
            'px-6 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-2',
            activeCategory === 'All'
              ? 'bg-white text-black border-white'
              : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-400',
          ]"
        >
          All
          <span
            :class="[
              'px-2 py-0.5 rounded-full text-xs',
              activeCategory === 'All' ? 'bg-gray-200 text-black' : 'bg-gray-800 text-gray-400',
            ]"
            >{{ getCount('All') }}</span
          >
        </button>

        <button
          @click="activeCategory = 'Frontend'"
          :class="[
            'px-6 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-2',
            activeCategory === 'Frontend'
              ? 'bg-white text-black border-white'
              : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-400',
          ]"
        >
          Frontend
          <span
            :class="[
              'px-2 py-0.5 rounded-full text-xs',
              activeCategory === 'Frontend'
                ? 'bg-gray-200 text-black'
                : 'bg-gray-800 text-gray-400',
            ]"
            >{{ getCount('Frontend') }}</span
          >
        </button>

        <button
          @click="activeCategory = 'Backend'"
          :class="[
            'px-6 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-2',
            activeCategory === 'Backend'
              ? 'bg-white text-black border-white'
              : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-400',
          ]"
        >
          Backend
          <span
            :class="[
              'px-2 py-0.5 rounded-full text-xs',
              activeCategory === 'Backend' ? 'bg-gray-200 text-black' : 'bg-gray-800 text-gray-400',
            ]"
            >{{ getCount('Backend') }}</span
          >
        </button>

        <button
          @click="activeCategory = 'Fullstack'"
          :class="[
            'px-6 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-2',
            activeCategory === 'Fullstack'
              ? 'bg-white text-black border-white'
              : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-400',
          ]"
        >
          Fullstack
          <span
            :class="[
              'px-2 py-0.5 rounded-full text-xs',
              activeCategory === 'Fullstack'
                ? 'bg-gray-200 text-black'
                : 'bg-gray-800 text-gray-400',
            ]"
            >{{ getCount('Fullstack') }}</span
          >
        </button>
      </div>

      <!-- Projects Grid -->
      <TransitionGroup
        name="project-list"
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
      >
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card group cursor-pointer flex flex-col transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)] rounded-4xl p-4 -m-4"
        >
          <!-- Image Container -->
          <div
            class="relative w-full aspect-4/3 rounded-4xl overflow-hidden bg-[#111] border border-white/5 mb-6"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            <!-- Tags Overlay -->
            <div class="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 z-10">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-medium rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Project Info -->
          <div class="px-2">
            <h3 class="text-2xl font-medium mb-2 group-hover:text-blue-400 transition-colors">
              {{ project.title }}
            </h3>
            <p class="text-gray-500 text-sm tracking-wide">{{ project.category }}</p>
          </div>
        </div>
      </TransitionGroup>

      <!-- Empty State -->
      <div v-if="filteredProjects.length === 0" class="w-full py-20 text-center text-gray-500">
        No projects found for this category.
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Transition Group Animations for filtering */
.project-list-move,
.project-list-enter-active,
.project-list-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-list-enter-from,
.project-list-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

/* Ensure leave items don't take up space in the grid during exit */
.project-list-leave-active {
  position: absolute;
}
</style>
