<template>  <nav class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-accent">
    <div class="grid h-full max-w-lg grid-cols-8 mx-auto font-medium"><router-link to="/dashboard" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group transition-all duration-300 hover:scale-105 active:scale-95">
        <svg class="w-6 h-6 mb-1 transition-all duration-300 group-hover:scale-110" :class="active==='home' ? 'text-accent animate-bounce' : 'text-primary'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"></path></svg>
        <span class="text-xs transition-all duration-300" :class="active==='home' ? 'text-accent font-semibold' : 'text-primary'">Home</span>
      </router-link>      <router-link to="/scan" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group transition-all duration-300 hover:scale-105 active:scale-95">
        <svg class="w-6 h-6 mb-1 transition-all duration-300 group-hover:scale-110" :class="active==='scan' ? 'text-accent animate-pulse' : 'text-primary'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M2 12a10 10 0 0020 0"/></svg>
        <span class="text-xs transition-all duration-300" :class="active==='scan' ? 'text-accent font-semibold' : 'text-primary'">Scan</span>
      </router-link>      <router-link to="/results" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group transition-all duration-300 hover:scale-105 active:scale-95">
        <svg class="w-6 h-6 mb-1 transition-all duration-300 group-hover:scale-110" :class="active==='results' ? 'text-accent animate-bounce' : 'text-primary'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
        <span class="text-xs transition-all duration-300" :class="active==='results' ? 'text-accent font-semibold' : 'text-primary'">Results</span>
      </router-link>      <router-link to="/history" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group transition-all duration-300 hover:scale-105 active:scale-95">
        <svg class="w-6 h-6 mb-1 transition-all duration-300 group-hover:scale-110" :class="active==='history' ? 'text-accent animate-spin' : 'text-primary'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
        <span class="text-xs transition-all duration-300" :class="active==='history' ? 'text-accent font-semibold' : 'text-primary'">History</span>
      </router-link>      <router-link to="/redeem" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group transition-all duration-300 hover:scale-105 active:scale-95">
        <svg class="w-6 h-6 mb-1 transition-all duration-300 group-hover:scale-110" :class="active==='redeem' ? 'text-accent animate-bounce' : 'text-primary'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="8" rx="4"/><path d="M7 8V6a5 5 0 0110 0v2"/></svg>
        <span class="text-xs transition-all duration-300" :class="active==='redeem' ? 'text-accent font-semibold' : 'text-primary'">Redeem</span>
      </router-link>      <router-link to="/education" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group transition-all duration-300 hover:scale-105 active:scale-95">
        <svg class="w-6 h-6 mb-1 transition-all duration-300 group-hover:scale-110" :class="active==='education' ? 'text-accent animate-pulse' : 'text-primary'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
        <span class="text-xs transition-all duration-300" :class="active==='education' ? 'text-accent font-semibold' : 'text-primary'">Education</span>
      </router-link>      <router-link to="/profile" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group transition-all duration-300 hover:scale-105 active:scale-95">
        <svg class="w-6 h-6 mb-1 transition-all duration-300 group-hover:scale-110" :class="active==='profile' ? 'text-accent animate-bounce' : 'text-primary'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg>
        <span class="text-xs transition-all duration-300" :class="active==='profile' ? 'text-accent font-semibold' : 'text-primary'">Profile</span>
      </router-link>
      <router-link to="/about" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group transition-all duration-300 hover:scale-105 active:scale-95">
        <svg class="w-6 h-6 mb-1 transition-all duration-300 group-hover:scale-110" :class="active==='about' ? 'text-accent animate-pulse' : 'text-primary'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <span class="text-xs transition-all duration-300" :class="active==='about' ? 'text-accent font-semibold' : 'text-primary'">About</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
const props = defineProps({
  active: String
})
</script>
