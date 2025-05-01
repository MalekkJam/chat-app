<template>

  

    <div class="p-4 md:p-6">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Chat Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Participants
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Created at
                        </th>
                        <th scope="col" class="px-6 py-3">
                            ACTIONS
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="conversation of conversations" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ conversation.chat_name }}
                        </th>
                        <td class="px-6 py-4">
                            {{ conversation.chat_type }}
                        </td>
                        <td class="px-10 py-4">
                            <button 
                            @click="openParticipantsModal(conversation.chat_name)" 
                            class="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 p-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30"
                            title="View participants"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            </button>
                        </td>
                        <td class="px-6 py-4">
                            {{ conversation.created_at }}
                        </td>
                        <td class="px-6 py-4">
                        <button 
                            @click="openAddParticipants(conversation.chat_name)"
                            class="p-1.5 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30"
                            title="Add participants"
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
        <PopupTable
        :isOpen="showParticipantsModal"
        :chatName="selectedChatName"
        :participants="participants"
        @close="closeParticipantsModal"
        @kick="kickUser"
        />
        <PopupTable
        :isOpen="showAddModal"
        :chatName="selectedChatName"
        :participants="availableUsers"
        mode="add"
        @close="closeAddModal"
        @add="addUser"
        />
    </div>
    
</template>
      
<script>
import PopupTable from './PopupTable.vue';

export default {
  components: {
    PopupTable
  },
  data() {
    return {
      conversations: [], 
      showParticipantsModal: false,
      showAddModal: false, 
      selectedChatName: '',
      participants: [], 
      availableUsers: [], 
      url: "http://localhost:3000", 
    }
  }, 
  mounted() {
    this.updateTable();
  },
  methods: {
    updateTable() {
      fetch(this.url + "/getAllChats", {
        method: "GET",
        mode: "cors", 
        headers: {
          "Content-Type": "Application/json"
        }, 
        credentials: "include"
      }).then(async(response) => {
        const data = await response.json();
        this.conversations = data; 
      })
    }, 

    openParticipantsModal(chatName) {
      this.selectedChatName = chatName;
      this.fetchParticipants(chatName);
      this.showParticipantsModal = true;
    },
    
    fetchParticipants(chatName) {
      fetch(this.url + "/getChatParticipants", {
        method: "POST",
        mode: "cors", 
        credentials: "include", 
        headers: {
          "Content-Type": "Application/json"
        }, 
        body: JSON.stringify({conversation_name: chatName})
      }).then(async(response) => {
        if (response.status == 200) {
          const data = await response.json();
          this.participants = data; 
        }
      })
    },

    openAddParticipants(chatName) {
      this.selectedChatName = chatName;
      this.fetchAvailableUsers(chatName);
      this.showAddModal = true;
    },

    fetchAvailableUsers(chatName) {
      fetch(this.url + "/getAvailableParticipants", {
        method: "POST",
        mode: "cors", 
        credentials: "include", 
        headers: {
          "Content-Type": "Application/json"
        }, 
        body: JSON.stringify({conversation_name: chatName})
      }).then(async(response) => {
        if (response.status == 200) {
          const data = await response.json();
          this.availableUsers = data;
        }
      })
    },

    kickUser(username) {
      fetch(this.url + "/kickUserFromChat", {
        method: "POST",
        mode: "cors", 
        headers: {
          "Content-Type": "Application/json"
        }, 
        credentials: "include", 
        body: JSON.stringify({
          username: username, 
          conversation_name: this.selectedChatName
        })
      }).then((response) => {
        if (response.status === 200) {
          this.fetchParticipants(this.selectedChatName);
        }
      })              
    }, 

    addUser(username) {
        fetch(this.url+"/addUserToChat",{
        method: "POST",
        mode: "cors", 
        headers: {
          "Content-Type": "Application/json"
        }, 
        credentials: "include", 
        body: JSON.stringify({
          username: username, 
          conversation_name: this.selectedChatName
        })
      }).then((response) => {
        if (response.status == 200) {
            this.fetchAvailableUsers(this.selectedChatName)
        }
      })
        
    },


    closeModal() {  
      this.showParticipantsModal = false;
      this.showAddModal = false;
    },

    
    closeParticipantsModal() {
      this.showParticipantsModal = false;
    },

    closeAddModal() {
      this.showAddModal = false;
    }
  }
}
</script>