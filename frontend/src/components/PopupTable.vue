<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 p-4">
    <!-- Blur Background Layer -->
    <div 
      class="fixed inset-0 bg-gray-500 bg-opacity-20 backdrop-blur-sm"
      @click="close"
    ></div>
    
    <!-- Modal Content -->
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
                <th scope="col" class="px-6 py-3">Email</th>
                <th scope="col" class="px-6 py-3">Joined At</th>
                <th scope="col" class="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="participant in participants" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ participant.username }}
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {{ participant.email }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  {{ formatDate(participant.joined_at) }}
                </td>
                <td class="px-6 py-4">
                  <button 
                    @click="kickParticipant(participant.username)"
                    class="flex items-center px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors duration-200"
                    title="Remove participant"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                     Kick Out
                  </button>
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
    },
    kickParticipant(username) {
      this.$emit('kick', username);
    }
  }
}
</script>
  