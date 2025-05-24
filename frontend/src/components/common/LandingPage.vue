<template>
  <div>
    <div v-if="!isAdmin" class="flex h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <!-- Empty State -->
      <div class="flex-1 flex flex-col items-center justify-center p-8 animate-fade-in">
        <div class="w-full max-w-lg text-center flex flex-col items-center">
          <!-- Animated icon container -->
          <div class="relative flex items-center justify-center h-32 w-32 mb-8">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse-slow opacity-20"></div>
            <div class="relative bg-white dark:bg-gray-800 rounded-full p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
              <svg class="h-16 w-16 text-blue-500 dark:text-blue-400 animate-bounce-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
          </div>
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white gradient-text mb-4">Welcome to Talksy!</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Choose a conversation from the sidebar to start chatting with your friends
          </p>
          <div class="flex flex-col gap-4 text-sm text-gray-500 dark:text-gray-500">
            <div class="flex items-center gap-3 justify-center">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>💬 Join group conversations</span>
            </div>
            <div class="flex items-center gap-3 justify-center">
              <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style="animation-delay: 0.5s"></div>
              <span>🔒 Start private chats</span>
            </div>
            <div class="flex items-center gap-3 justify-center">
              <div class="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style="animation-delay: 1s"></div>
              <span>👥 Connect with friends</span>
            </div>
          </div>
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