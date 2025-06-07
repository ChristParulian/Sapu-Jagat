<template>
  <div v-if="show" class="fixed z-50 top-6 left-1/2 -translate-x-1/2 flex flex-col items-center w-full pointer-events-none">
    <div :class="toastClass" class="flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow pointer-events-auto animate-fade-in">
      <div v-if="icon" class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg mr-3" :class="iconBg">
        <span class="text-xl">{{ icon }}</span>
      </div>
      <div class="ml-2 text-sm font-normal">{{ message }}</div>
      <button type="button" @click="close" class="ml-auto -mx-1.5 -my-1.5 bg-transparent text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
const props = defineProps({
  type: { type: String, default: 'success' }, // 'success', 'error', 'info', 'warning'
  message: { type: String, required: true },
  duration: { type: Number, default: 2500 },
  icon: { type: String, default: '' },
  modelValue: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])
const show = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  show.value = val
  if (val && props.duration > 0) {
    setTimeout(() => close(), props.duration)
  }
})

function close() {
  show.value = false
  emit('update:modelValue', false)
}

const toastClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-100 text-green-800 border border-green-300'
    case 'error':
      return 'bg-red-100 text-red-800 border border-red-300'
    case 'info':
      return 'bg-blue-100 text-blue-800 border border-blue-300'
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-300'
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-300'
  }
})
const iconBg = computed(() => {
  switch (props.type) {
    case 'success': return 'bg-green-200 text-green-700'
    case 'error': return 'bg-red-200 text-red-700'
    case 'info': return 'bg-blue-200 text-blue-700'
    case 'warning': return 'bg-yellow-200 text-yellow-700'
    default: return 'bg-gray-200 text-gray-700'
  }
})
</script>

<style scoped>
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.4s;
}
</style>
