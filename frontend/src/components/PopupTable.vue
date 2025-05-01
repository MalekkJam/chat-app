<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 p-4">
    <!-- Blur Background -->
    <div class="fixed inset-0 bg-gray-500 bg-opacity-20 backdrop-blur-sm" @click="close"></div>
    
    <!-- Modal Content -->
    <div class="relative bg-white rounded-lg shadow-xl w-full max-w-2xl dark:bg-gray-800 max-h-[90vh] flex flex-col">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ mode === 'view' ? 'Participants in ' + chatName : 'Add Participants to ' + chatName }}
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
                  <span class="px-2 py-1 rounded-full text-xs font-semibold text-blue-600 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/30">
                    {{ participant.email }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  {{ formatDate(participant.joined_at) }}
                </td>
                <td class="px-6 py-4">
                  <!-- Action buttons that change based on mode -->
                  <button 
                    v-if="mode === 'view'"
                    @click="kickParticipant(participant.username)"
                    class="p-1.5 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30"
                    title="Remove participant"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <button 
                    v-if="mode === 'add'"
                    @click="addParticipant(participant.username)"
                    class="p-1.5 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-200 rounded-md hover:bg-green-50 dark:hover:bg-green-900/30"
                    title="Add participant"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
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
    participants: Array,
    mode: {  // New prop to control behavior
      type: String,
      default: 'view',  // 'view' or 'add'
      validator: value => ['view', 'add'].includes(value)
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
    },
    addParticipant(username) {
      this.$emit('add', username);
    }
  }
}
</script>