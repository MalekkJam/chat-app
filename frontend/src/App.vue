<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
    <RouterView />
  </div>
</template>

<style>
/* Global app styling enhancements */
#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom focus styles for better accessibility */
*:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  border-radius: 4px;
}

/* Enhanced selection styling */
::selection {
  background-color: rgba(59, 130, 246, 0.2);
  color: inherit;
}

::-moz-selection {
  background-color: rgba(59, 130, 246, 0.2);
  color: inherit;
}
</style>


