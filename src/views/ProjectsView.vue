<script setup lang="ts">
import { ref, computed } from 'vue'
import ProjectDetailModal from '@/components/ProjectDetailModal.vue'
import Hero3D from '@/components/Hero3D.vue'

const projects = ref([
  {
    id: 1,
    title: 'Book Social Network',
    category: 'Fullstack',
    description: 'Engineered a secure enterprise-grade full-stack application featuring role-based access control (RBAC) and JWT authentication with token activation. Developed high-performance RESTful APIs to manage core data entities and secure transactions, alongside automated SQL scripts to streamline production deployments.',
    image: '/images/bsn/3-bsn-home.png',
    tags: ['Angular 19', 'Spring Boot', 'PostgreSQL'],
    link: '#',
    githubFrontend: 'https://github.com/hadidhardiansyah/book-network-ui',
    githubBackend: 'https://github.com/hadidhardiansyah/restful-api-book-social-network',
    gallery: [
      '/images/bsn/1-bsn-login.png',
      '/images/bsn/2-bsn-register.png',
      '/images/bsn/3-bsn-home.png',
      '/images/bsn/4-bsn-my-books.png',
      '/images/bsn/5-bsn-manage-book.png',
      '/images/bsn/6-bsn-waitlist.png',
      '/images/bsn/7-bsn-returned.png',
      '/images/bsn/8-bsn-borrowed.png',
      '/images/bsn/9-bsn-return.png',
      '/images/bsn/10-bsn-profile-details.png',
      '/images/bsn/11-bsn-change-pass.png'
    ]
  },
  {
    id: 2,
    title: 'Bills Food',
    category: 'Fullstack',
    description: 'Engineered an end-to-end multi-restaurant food ordering system with a dynamic checkout flow and centralized state management. Modernized the frontend architecture by migrating from Webpack to Vite and upgrading to React 19, significantly optimizing build performance.',
    image: '/images/bills-food/1-home.png',
    tags: ['React 19', 'Spring Boot', 'MySQL'],
    link: '#',
    githubFrontend: 'https://github.com/hadidhardiansyah/Bills-Food-UI',
    githubBackend: 'https://github.com/hadidhardiansyah/RestAPI-Bills-Food',
    gallery: [
      '/images/bills-food/1-home.png',
      '/images/bills-food/2-top-meals.png',
      '/images/bills-food/3-register.png',
      '/images/bills-food/4-login.png',
      '/images/bills-food/5-admin-dashboard.png',
      '/images/bills-food/6-admin-manage-restaurant.png',
      '/images/bills-food/7-admin-food-menu.png',
      '/images/bills-food/8-admin-food-menu-add.png',
      '/images/bills-food/9-admin-food-menu-edit.png',
      '/images/bills-food/10-admin-food-cat.png',
      '/images/bills-food/11-admin-food-cat-add.png',
      '/images/bills-food/12-admin-order.png',
      '/images/bills-food/13-admin-ingredient.png',
      '/images/bills-food/14-admin-ingredient-add.png',
      '/images/bills-food/15-admin-event.png',
      '/images/bills-food/16-admin-event-create.png',
      '/images/bills-food/17-admin-event-edit.png',
      '/images/bills-food/18-user.png',
      '/images/bills-food/19-user.png',
      '/images/bills-food/20-user-cart.png',
      '/images/bills-food/21-user-cart-address-add.png',
      '/images/bills-food/22-user-profile.png',
      '/images/bills-food/23-user-fav.png',
      '/images/bills-food/24-user-address.png',
      '/images/bills-food/25-user-payment.png',
      '/images/bills-food/26-user-payment-add.png',
      '/images/bills-food/28-user-notif.png',
      '/images/bills-food/29-user-event.png'
    ]
  },
  {
    id: 3,
    title: 'Fitness App UI',
    category: 'Frontend',
    description: 'A modern fitness application landing page built with React, TypeScript, and Tailwind CSS. Features smooth scrolling, responsive design, and framer motion animations.',
    image: '/images/fitness/1.png',
    tags: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    link: '#',
    githubFrontend: 'https://github.com/hadidhardiansyah/fitness-app',
    youtubeLink: 'https://www.youtube.com/watch?v=I2NNxr3WPDo',
    gallery: [
      '/images/fitness/1.png',
      '/images/fitness/2.png',
      '/images/fitness/3.png',
      '/images/fitness/4.png',
      '/images/fitness/5.png',
      '/images/fitness/6.png'
    ]
  },
  {
    id: 4,
    title: 'Crypto Tracker',
    category: 'Mobile',
    description: 'Developed an iOS app for tracking cryptocurrency prices using data from the CoinGecko API. Displayed real-time data with the ability to search and monitor multiple cryptocurrencies.',
    image: '/images/mobile-ios/crypto-app.png',
    tags: ['SwiftUI', 'iOS', 'API'],
    link: '#',
    githubFrontend: 'https://github.com/hadidhardiansyah/Crypto-Tracker',
    youtubeLink: 'https://www.youtube.com/watch?v=TTYKL6CfbSs&list=PLwvDm4Vfkdphbc3bgy_LpLRQ9DDfFGcFu',
    gallery: [
      '/images/mobile-ios/crypto-app.png'
    ]
  },
  {
    id: 5,
    title: 'Maps App',
    category: 'Mobile',
    description: 'Built a location-based Maps application using MVVM structure, providing a seamless experience for users to explore maps and nearby locations.',
    image: '/images/mobile-ios/maps-app.png',
    tags: ['SwiftUI', 'iOS', 'MVVM'],
    link: '#',
    githubFrontend: 'https://github.com/hadidhardiansyah/Map-IOS16.2',
    youtubeLink: 'https://www.youtube.com/watch?v=Jhf3CNs8I-I&list=PLwvDm4Vfkdpha5eVTjLM0eRlJ7-yDDwBk',
    gallery: [
      '/images/mobile-ios/maps-app.png'
    ]
  },
  {
    id: 6,
    title: 'Todo List App',
    category: 'Mobile',
    description: 'Developed a Todo List application that uses App Storage and follows MVVM architecture for managing tasks and maintaining state.',
    image: '/images/mobile-ios/todolist-app.png',
    tags: ['SwiftUI', 'iOS', 'AppStorage'],
    link: '#',
    githubFrontend: 'https://github.com/hadidhardiansyah/Todo-List-with-App-Storage',
    youtubeLink: 'https://www.youtube.com/watch?v=wEf1YS4vyW8&list=PLwvDm4VfkdpheGqemblOIA7v3oq0MS30i',
    gallery: [
      '/images/mobile-ios/todolist-app.png'
    ]
  }
])

const isModalOpen = ref(false)
const selectedProject = ref(null)

const openProject = (project: any) => {
  selectedProject.value = project
  isModalOpen.value = true
}

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
  <main class="w-full min-h-screen bg-transparent text-white pt-24 relative overflow-hidden">
    <Hero3D :showMacbook="false" />

    <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
      <!-- Back Link -->
      <div class="flex justify-center mb-16">
        <RouterLink
          to="/"
          class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </RouterLink>
      </div>

      <!-- Header -->
      <div class="text-center mb-16 relative z-10">
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
          Selected Work
        </h1>
        <p class="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto">
          A showcase of products I've engineered, from robust enterprise backends to seamless mobile applications.
        </p>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap justify-center gap-4 mb-20 relative z-10">
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
          @click="activeCategory = 'Mobile'"
          :class="[
            'px-6 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-2',
            activeCategory === 'Mobile'
              ? 'bg-white text-black border-white'
              : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-400',
          ]"
        >
          Mobile
          <span
            :class="[
              'px-2 py-0.5 rounded-full text-xs',
              activeCategory === 'Mobile'
                ? 'bg-gray-200 text-black'
                : 'bg-gray-800 text-gray-400',
            ]"
            >{{ getCount('Mobile') }}</span
          >
        </button>
      </div>

      <!-- Projects Grid -->
      <TransitionGroup
        name="project-list"
        tag="div"
        class="project-grid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
      >
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          @click="openProject(project)"
          class="project-card group cursor-pointer relative w-full aspect-4/3 rounded-[2rem] overflow-hidden bg-[#111] border border-white/10 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)]"
        >
          <!-- Background Image -->
          <img
            :src="project.image"
            :alt="project.title"
            class="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
          
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none"></div>

          <!-- Content overlay (Bottom aligned) -->
          <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end z-10">
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-4 py-1.5 bg-black/20 border border-white/40 text-white text-xs font-medium rounded-full backdrop-blur-md group-hover:border-white/80 transition-colors"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Title & Arrow row -->
            <div class="flex items-end justify-between gap-6">
              <h3 class="text-2xl md:text-3xl font-semibold text-white leading-tight group-hover:text-blue-400 transition-colors line-clamp-2">
                {{ project.title }}
              </h3>
              
              <!-- Arrow Icon -->
              <div class="flex-shrink-0 text-white mb-1 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                <svg class="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Empty State -->
      <div v-if="filteredProjects.length === 0" class="w-full py-20 text-center text-gray-500">
        No projects found for this category.
      </div>
    </div>
    
    <!-- Modal -->
    <ProjectDetailModal 
      :isOpen="isModalOpen" 
      :project="selectedProject" 
      @close="isModalOpen = false" 
    />
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
