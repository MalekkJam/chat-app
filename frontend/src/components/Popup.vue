<template>
    <!-- Background overlay -->
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <!-- Popup container -->
      <div class="w-full max-w-md bg-white rounded-lg shadow-xl dark:bg-gray-800 overflow-hidden">
        <!-- Header with padding -->
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold text-red-600 dark:text-red-400">
            Confirm Account Deletion
          </h3>
        </div>
  
        <!-- Content with padding -->
        <div class="px-6 py-4">
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Are you sure you want to delete your account? This action cannot be undone. All your data will be permanently removed.
          </p>
          <!-- Countdown display -->
          <div v-if="isDeleting" class="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Redirecting to login in {{ countdown }} seconds...
          </div>
        </div>
  
        <!-- Actions -->
        <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end gap-4">
          <button
            @click="$emit('cancel')"
            :disabled="isDeleting"
            class="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            :disabled="isDeleting"
            class="px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 disabled:opacity-50"
          >
            {{ isDeleting ? 'Deleting...' : 'Delete Account' }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PopupConfirm',
    data() {
      return {
        isDeleting: false,
        countdown: 3,
        countdownInterval: null
      }
    },
    methods: {
      confirmDelete() {
        this.isDeleting = true
        
        // Start countdown
        this.countdownInterval = setInterval(() => {
          this.countdown--
          
          if (this.countdown <= 0) {
            clearInterval(this.countdownInterval)
            this.$emit('confirm')  // Emit confirm event
            this.redirectToLogin()
          }
        }, 1000)
      },
      redirectToLogin() {
        // Replace with your actual login route
        this.$router.push('/login')
      }
    },
    beforeUnmount() {
      // Clean up interval when component is destroyed
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval)
      }
    },
    emits: ['confirm', 'cancel']
  }
  </script>