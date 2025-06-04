<template>
  <nav class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-accent">
    <div class="grid h-full max-w-lg grid-cols-7 mx-auto font-medium">
      <router-link v-for="item in navItems" :key="item.key" :to="item.to" class="inline-flex flex-col items-center justify-center px-5 group transition-all duration-200">
        <transition name="nav-bounce" mode="out-in">
          <svg v-if="active===item.key" :key="item.key+'-active'" :class="'w-8 h-8 mb-1 text-accent scale-125 drop-shadow-lg animate-bounce-once'" v-html="item.iconActive" />
          <svg v-else :key="item.key" class="w-6 h-6 mb-1 text-primary transition-all duration-200" v-html="item.icon" />
        </transition>
        <span class="text-xs mt-0.5 transition-all duration-200" :class="active===item.key ? 'text-accent font-bold scale-110' : 'text-primary'">{{ item.label }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
const props = defineProps({
  active: String
})

const navItems = [
  {
    key: 'home',
    to: '/dashboard',
    label: 'Home',
    icon: `<svg fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6'></path></svg>`,
    iconActive: `<svg fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6'></path></svg>`
  },
  {
    key: 'scan',
    to: '/scan',
    label: 'Scan',
    icon: `<svg fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><circle cx='12' cy='12' r='4'/><path d='M2 12a10 10 0 0020 0'/></svg>`,
    iconActive: `<svg fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><circle cx='12' cy='12' r='4'/><path d='M2 12a10 10 0 0020 0'/></svg>`
  },
  {
    key: 'results',
    to: '/results',
    label: 'Results',
    icon: `<svg fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path d='M5 13l4 4L19 7'/></svg>`,
    iconActive: `<svg fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path d='M5 13l4 4L19 7'/></svg>`
  },
  {
    key: 'history',
    to: '/history',
    label: 'History',
    icon: `<svg fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path d='M12 8v4l3 3'/><circle cx='12' cy='12' r='10'/></svg>`,
    iconActive: `<svg fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path d='M12 8v4l3 3'/><circle cx='12' cy='12' r='10'/></svg>`
  },
  {
    key: 'redeem',
    to: '/redeem',
    label: 'Redeem',
    icon: `<svg fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><rect x='3' y='8' width='18' height='8' rx='4'/><path d='M7 8V6a5 5 0 0110 0v2'/></svg>`,
    iconActive: `<svg fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><rect x='3' y='8' width='18' height='8' rx='4'/><path d='M7 8V6a5 5 0 0110 0v2'/></svg>`
  },
  {
    key: 'education',
    to: '/education',
    label: 'Education',
    icon: `<svg fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path d='M12 3L2 9l10 6 10-6-10-6z'/><path d='M2 17l10 6 10-6'/><path d='M2 12l10 6 10-6'/></svg>`,
    iconActive: `<svg fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path d='M12 3L2 9l10 6 10-6-10-6z'/><path d='M2 17l10 6 10-6'/><path d='M2 12l10 6 10-6'/></svg>`
  },
  {
    key: 'profile',
    to: '/profile',
    label: 'Profile',
    icon: `<svg fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><circle cx='12' cy='8' r='4'/><path d='M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2'/></svg>`,
    iconActive: `<svg fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><circle cx='12' cy='8' r='4'/><path d='M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2'/></svg>`
  }
]
</script>

<style scoped>
.nav-bounce-enter-active {
  animation: bounce-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both;
}
@keyframes bounce-in {
  0% { transform: scale(0.7); opacity: 0; }
  60% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-bounce-once {
  animation: bounce-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both;
}
</style>
