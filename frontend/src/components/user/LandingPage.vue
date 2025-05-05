<template>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
      
  
        <!-- Empty State -->
        <div class="flex-1 flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800">
          <div class="w-full max-w-md text-center">
            <svg class="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            <h2 class="mt-4 text-xl font-bold text-gray-800 dark:text-white">No conversation selected</h2>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
              Choose an existing conversation from the sidebar or start a new one
            </p>
            <div class="mt-6">
              <button 
                @click="startNewConversation"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
              >
                <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                New Conversation
              </button>
            </div>
          </div>
        </div>
   </div>
   
  </template>
  
  <script>
  export default {
    props: {
      username: {
        type: String,
        required: true
      }
    },
    methods: {
      startNewConversation() {
        this.$emit('new-conversation'); 
      }
    }
  }
  </script>
  
  <style scoped>
  /* Smooth transitions for dark mode */
  .bg-white {
    transition: background-color 0.3s ease;
  }
  .dark\:bg-gray-800 {
    transition: background-color 0.3s ease;
  }
  </style>