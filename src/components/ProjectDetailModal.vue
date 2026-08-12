<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  isOpen: boolean
  project: any
}>()

const emit = defineEmits(['close'])

// Prevent body scroll when modal is open
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  },
)

onUnmounted(() => {
  document.body.style.overflow = 'auto'
})

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <Transition name="modal-fade">
    <div
      v-if="isOpen && project"
      class="fixed inset-0 z-[100] flex justify-center bg-black/80 backdrop-blur-xl overflow-y-auto"
      @click.self="closeModal"
    >
      <!-- Close Button (Fixed) -->
      <button
        @click="closeModal"
        class="fixed top-6 right-6 md:top-10 md:right-10 z-[110] w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all backdrop-blur-md hover:scale-110"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>

      <!-- Modal Content Wrapper -->
      <div class="relative w-full max-w-6xl min-h-screen py-20 px-6 flex flex-col pointer-events-none">
        
        <!-- Header Info -->
        <div class="mb-12 pointer-events-auto max-w-3xl">
          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="px-4 py-1.5 bg-white/10 border border-white/20 text-white text-xs font-medium rounded-full"
            >
              {{ tag }}
            </span>
          </div>
          <h2 class="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-6">
            {{ project.title }}
          </h2>
          <p class="text-xl text-gray-400 font-light leading-relaxed mb-8">
            {{ project.description || 'A comprehensive look into the screens and user flows.' }}
          </p>

          <!-- Repository Links -->
          <div class="flex flex-wrap gap-4">
            <a
              v-if="project.githubFrontend"
              :href="project.githubFrontend"
              target="_blank"
              class="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/15 border border-white/10 text-white rounded-full transition-all hover:scale-105"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
              </svg>
              <span class="font-medium text-sm">Frontend Repo</span>
            </a>
            
            <a
              v-if="project.githubBackend"
              :href="project.githubBackend"
              target="_blank"
              class="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/15 border border-white/10 text-white rounded-full transition-all hover:scale-105"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
              </svg>
              <span class="font-medium text-sm">Backend Repo</span>
            </a>
            
            <a
              v-if="project.youtubeLink"
              :href="project.youtubeLink"
              target="_blank"
              class="flex items-center gap-3 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-white rounded-full transition-all hover:scale-105"
            >
              <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span class="font-medium text-sm">Watch Original Tutorial</span>
            </a>
          </div>
        </div>

        <!-- Gallery Images -->
        <div class="flex flex-col gap-10 md:gap-16 pointer-events-auto">
          <template v-if="project.gallery && project.gallery.length > 0">
            <div
              v-for="(img, idx) in project.gallery"
              :key="idx"
              class="w-full bg-[#111] rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
            >
              <img :src="img" class="w-full h-auto object-cover" loading="lazy" />
            </div>
          </template>
          
          <template v-else>
            <!-- Fallback if no gallery exists -->
            <div class="w-full bg-[#111] rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
              <img :src="project.image" class="w-full h-auto object-cover" />
            </div>
          </template>
        </div>

        <!-- Footer / End of Gallery -->
        <div class="mt-20 pb-12 flex justify-center pointer-events-auto">
          <button
            @click="closeModal"
            class="px-8 py-4 bg-white text-black font-medium rounded-full hover:scale-105 transition-transform"
          >
            Back to Projects
          </button>
        </div>

      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(50px) scale(0.98);
}
</style>
