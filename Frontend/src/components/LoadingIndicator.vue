<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-[#FEFAE0] bg-opacity-100">
    <div class="flex flex-col items-center">
      <svg class="animate-spin h-12 w-12 text-[#a7c957]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      <span class="mt-4 text-[#386641] font-semibold text-lg">
        {{ message || 'Sedang memuat...' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  visible: { type: Boolean, default: false },
  message: { type: String, default: '' }
})
</script>

<style scoped>
.animate-spin {
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
