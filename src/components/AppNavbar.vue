<script setup lang="ts">
// Navbar component
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
          Home
          <span
            class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100 shadow-[0_0_6px_rgba(52,211,153,0.8)]"
          ></span>
        </RouterLink>
        <RouterLink
          to="/about"
          class="relative px-5 py-2 text-sm text-gray-400 font-medium transition-all hover:text-white rounded-full hover:bg-white/5 group"
          exact-active-class="!text-white"
        >
          About
          <span
            class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100 shadow-[0_0_6px_rgba(52,211,153,0.8)]"
          ></span>
        </RouterLink>
        <RouterLink
          to="/projects"
          class="relative px-5 py-2 text-sm text-gray-400 font-medium transition-all hover:text-white rounded-full hover:bg-white/5 group"
          exact-active-class="!text-white"
        >
          Projects
          <span
            class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100 shadow-[0_0_6px_rgba(52,211,153,0.8)]"
          ></span>
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
    </div>
  </nav>
</template>
