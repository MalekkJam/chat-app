<template>
  <div>
    <div v-if="!isAdmin" class="flex h-screen bg-white">
      <!-- Empty State -->
      <div class="flex-1 flex flex-col items-center justify-center p-6 bg-white">
        <div class="w-full max-w-md text-center flex flex-col items-center">
          <!-- Centered icon container with precise control -->
          <div class="flex items-center justify-center h-20 w-20 mb-4">
            <svg class="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-800">No conversation selected</h2>
          <p class="mt-2 text-gray-600">
            Choose an existing conversation from the sidebar
          </p>
        </div>
      </div>
    </div>
    <AdminContainer v-else
    @new-chat-added = newChatAdded() 
    @chat-deleted = deleteChat()
    @user-deleted = deleteUser()
    ></AdminContainer>
  </div>
</template>
  
<script>

  export default {
    data() {
      return {
        isAdmin : false , 
      }
    },
    props: {
      username: {
        type: String,
        required: true, 

      }
    },
    mounted () {
      this.verifyAdminRole() 
    }, 
    methods: {
      startNewConversation() {
        this.$emit('new-conversation'); 
      }, 
      verifyAdminRole() {
        const url = "http://localhost:3000";

        fetch(url+"/verifyAdminRole", {
          method : "POST",
          mode : "cors", 
          headers : {
          "Content-Type" : "Application/json"
        }, 
        credentials : "include" 
        }).then((response) => {
          if (response.status == 200) {
            this.isAdmin = true ; 
          }
        })
      }, 
      newChatAdded() {
        this.$emit('new-chat-added')
      }, 
      deleteChat() {
        this.$emit("chat-deleted")
      }, 
      deleteUser() {
        this.$emit("user-deleted")
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