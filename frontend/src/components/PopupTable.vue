<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 p-4">
      <!-- Blur Background Layer -->
      <div 
        class="fixed inset-0 bg-gray-500 bg-opacity-20 backdrop-blur-sm"
        @click="close"
      ></div>
      
      <!-- Modal Content (same as before but now relative to z-index) -->
      <div class="relative bg-white rounded-lg shadow-xl w-full max-w-2xl dark:bg-gray-800 max-h-[90vh] flex flex-col">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Participants in {{ chatName }}
          </h3>
          <button @click="close" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
  
        <!-- Modal Content -->
        <div class="overflow-y-auto flex-1">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                <tr>
                  <th scope="col" class="px-6 py-3">Username</th>
                  <th scope="col" class="px-6 py-3">Role</th>
                  <th scope="col" class="px-6 py-3">Joined At</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="participant in participants" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ participant.username }}
                  </td>
                  <td class="px-6 py-4">
                    <span :class="`px-2 py-1 rounded-full text-xs font-semibold ${participant.role === 'admin' ? 'text-purple-600 bg-purple-100 dark:text-purple-300 dark:bg-purple-900/30' : 'text-blue-600 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/30'}`">
                      {{ participant.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    {{ formatDate(participant.joined_at) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        <div class="flex items-center justify-end p-4 border-t dark:border-gray-700">
          <button @click="close" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
            Close
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: Boolean,
      chatName: String,
      participants: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      formatDate(dateString) {
        return new Date(dateString).toLocaleDateString();
      }
    }
  }
  </script>