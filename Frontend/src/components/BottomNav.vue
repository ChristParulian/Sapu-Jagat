<template>
  <nav class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-accent">
    <div class="grid h-full max-w-lg grid-cols-6 mx-auto font-medium">
      <router-link to="/dashboard" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group">
        <svg class="w-6 h-6 mb-1" :class="active==='home' ? 'text-accent' : 'text-primary'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"></path></svg>
        <span class="text-xs" :class="active==='home' ? 'text-accent' : 'text-primary'">Home</span>
      </router-link>
      <router-link to="/scan" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group">
        <svg class="w-6 h-6 mb-1" :class="active==='scan' ? 'text-accent' : 'text-primary'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M2 12a10 10 0 0020 0"/></svg>
        <span class="text-xs" :class="active==='scan' ? 'text-accent' : 'text-primary'">Scan</span>
      </router-link>
      <router-link to="/results" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group">
        <svg class="w-6 h-6 mb-1" :class="active==='results' ? 'text-accent' : 'text-primary'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
        <span class="text-xs" :class="active==='results' ? 'text-accent' : 'text-primary'">Results</span>
      </router-link>
      <router-link to="/history" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group">
        <svg class="w-6 h-6 mb-1" :class="active==='history' ? 'text-accent' : 'text-primary'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
        <span class="text-xs" :class="active==='history' ? 'text-accent' : 'text-primary'">History</span>
      </router-link>
      <router-link to="/redeem" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group">
        <svg class="w-6 h-6 mb-1" :class="active==='redeem' ? 'text-accent' : 'text-primary'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="8" rx="4"/><path d="M7 8V6a5 5 0 0110 0v2"/></svg>
        <span class="text-xs" :class="active==='redeem' ? 'text-accent' : 'text-primary'">Redeem</span>
      </router-link>
      <router-link to="/profile" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group">
        <svg class="w-6 h-6 mb-1" :class="active==='profile' ? 'text-accent' : 'text-primary'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg>
        <span class="text-xs" :class="active==='profile' ? 'text-accent' : 'text-primary'">Profile</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
const props = defineProps({
  active: String
})
</script>
