<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
import PageLoader from './components/PageLoader.vue'
import CustomCursor from './components/CustomCursor.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <CustomCursor />
  <PageLoader />
  <AppNavbar />
  <RouterView v-slot="{ Component }">
    <transition name="page-fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
  <AppFooter />
</template>

<style>
/* Page Transition Animations */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease, filter 0.5s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
  filter: blur(5px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  filter: blur(5px);
}
/* Any global resets not covered by tailwind */
</style>
