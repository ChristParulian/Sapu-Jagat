<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white rounded-xl shadow-xl p-6 w-full max-w-xs flex flex-col items-center animate-fade-in">
      <div class="text-brand-forest text-base font-semibold mb-4 text-center">{{ message }}</div>
      <div class="flex gap-3 mt-2 w-full">
        <button @click="$emit('cancel')" class="flex-1 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold">Batal</button>
        <button @click="$emit('ok')" class="flex-1 py-2 rounded-lg bg-brand-yellow hover:bg-brand-sage text-brand-forest font-bold">Hapus</button>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  visible: Boolean,
  message: String
})
defineEmits(['ok', 'cancel'])
</script>
<style scoped>
@keyframes fade-in { 0% { opacity: 0; transform: translateY(-20px);} 100% { opacity: 1; transform: translateY(0);} }
.animate-fade-in { animation: fade-in 0.3s; }
</style>