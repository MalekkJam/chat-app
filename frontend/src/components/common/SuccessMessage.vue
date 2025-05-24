<template>
    <div 
      v-if="message" 
      class="w-auto p-4 mb-4 text-sm text-green-800 rounded-xl bg-green-50 dark:bg-green-900/20 dark:text-green-400 border border-green-200 dark:border-green-800 shadow-lg animate-slide-in-right flex items-center gap-3"
      role="alert">
      <div class="flex-shrink-0">
        <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
      </div>
      <span class="font-medium">{{ message }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: String,
        required: true
      }
    }
  };
  </script>
  