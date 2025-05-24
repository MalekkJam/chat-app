<template>
  <div class="p-3 md:p-4">
    <div class="relative overflow-hidden shadow-xl sm:rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
      <!-- Chat Header -->
      <div class="p-4 border-b dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-750">
        <div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
            {{ activeConversation }} 
          </h3>
          <span class="text-xs px-3 py-1 rounded-full font-medium transition-all duration-200 hover:scale-105" 
                :class="chatType === 'private' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 border border-blue-200 dark:border-blue-700' 
                  : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200 border border-purple-200 dark:border-purple-700'">
            {{ chatType === 'private' ? '🔒 Private Chat' : '👥 Group Chat' }}
          </span>
        </div>
        <div v-if="chatType === 'group'" class="flex space-x-3">
          <!-- Group-specific actions -->
          <button class="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
        </div>
      </div>
      <!-- Messages Container -->
      <div class="h-[calc(100vh-300px)] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div 
          v-for="(message, index) in messages"
          :key="index"
          class="flex gap-4 animate-fade-in-up"
          :class="{'justify-end': message.isCurrentUser}"
          style="animation-delay: calc(var(--animation-order) * 100ms)"
        >
          <img
            v-if="!message.isCurrentUser"
            class="w-10 h-10 rounded-full mt-1 border-2 border-white dark:border-gray-600 shadow-md transition-transform duration-200 hover:scale-110"
            src="../../assets/images/profile.png"
            alt="User image"
          />
          
          <div class="flex flex-col" :class="{'items-end': message.isCurrentUser}">
            <div class="flex items-baseline gap-2">
              <span 
                class="text-sm font-semibold"
                :class="message.isCurrentUser ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'"
              >
                {{ message.username }}
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ formatDate(message.date) }}
              </span>
            </div>
            
            <div
              class="mt-2 p-4 rounded-xl max-w-[80%] shadow-sm transition-all duration-200 hover:shadow-md"
              :class="message.isCurrentUser 
                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-none' 
                : 'bg-white dark:bg-gray-700 rounded-tl-none border border-gray-200 dark:border-gray-600'"
            >
              <p class="text-sm emoji-text"
                 :class="message.isCurrentUser ? 'text-white' : 'text-gray-900 dark:text-white'">
                {{ message.content }}
              </p>
            </div>
            
            <span class="text-xs mt-1 text-gray-500 dark:text-gray-400">
              {{ message.status }}
            </span>
          </div>

          <img
            v-if="message.isCurrentUser"
            class="w-10 h-10 rounded-full mt-1 border-2 border-blue-200 dark:border-blue-400 shadow-md transition-transform duration-200 hover:scale-110"
            src="../../assets/images/current-user.png"
            alt="Your profile"
          />
        </div>
      </div>

      <!-- Message Input with Emoji Picker -->
      <div class="relative p-4 border-t dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-750">
        <div class="flex gap-3 items-center">
          <!-- Emoji Picker Button -->
          <button 
            @click="toggleEmojiPicker"
            class="p-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <!-- Emoji Picker (shown when button clicked) -->
          <div 
            v-if="showEmojiPicker"
            class="absolute bottom-20 left-4 z-50 animate-fade-in-up bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <emoji-picker @emoji-click="addEmojiToInput" class="border-none"></emoji-picker>
          </div>

          <!-- Message Input -->
          <input
            type="text"
            v-model="message_tosend"
            @keyup.enter="_sendMessage"
            class="flex-1 p-4 text-sm text-gray-900 bg-white dark:bg-gray-700 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white shadow-sm transition-all duration-200 hover:shadow-md focus:shadow-lg"
            placeholder="Type your message... ✨"
          />
          
          <!-- Send Button -->
          <button
            @click="_sendMessage"
            class="px-5 py-4 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
.emoji-text {
  font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
  line-height: 1.5;
}

/* Optional: Style the emoji picker to match your theme */
emoji-picker {
  --background: white;
  --border-color: #e5e7eb;
  --category-emoji-padding: 0.5rem;
}

.dark emoji-picker {
  --background: #374151;
  --border-color: #4b5563;
  --text-color: #f3f4f6;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out;
}

/* Smooth scrolling for messages */
.overflow-y-auto {
  scroll-behavior: smooth;
}

/* Custom scrollbar styling */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
<script>
import { initWebSocket, sendMessage  } from '@/services/websocket.service';
import 'emoji-picker-element';


export default {
   data()  {
      return {
         message_tosend : "",
         messages : [], 
         activeConversation : "",
         showEmojiPicker : false , 
         chatType : ""
      }
   }, 
   async mounted()  {
      await this.determineChatType()
      await this.initializeConversation()
   },
   watch: {
    // Watch for changes in the route parameter
    "$route.params.conversation": {
      immediate: true, // Trigger the watcher immediately on component load
      handler() {
        this.determineChatType() ; 
        this.initializeConversation();
      },
    },
  },
   methods : { 
      determineChatType() {
        this.chatType = this.$route.path.includes('/private/') ? 'private' : 'group';
        console.log(this.chatType);
      },
      formatDate(date) {
         const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
         return new Date(date).toLocaleDateString(undefined, options);
      },
      async initializeConversation() {
         try {
          const socket = await initWebSocket();
          this.activeConversation = this.$route.params.conversation;
          
          const request = {
              type: "request",
              action: "loadMessages",
              conversation: this.activeConversation,
              chatType : this.chatType
          };

         sendMessage(JSON.stringify(request));

         socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            console.log(response);
            if (
               response.type === "response" &&
               response.action === "loadMessages" &&
               response.conversation === this.activeConversation
            ) {
               this.messages = response.data;
            }
            if (
              response.type === "broadcast" && 
              response.action === "newMessages" && 
              response.conversation === this.activeConversation 
            ){
              this.messages.push({
                username : response.username,
                content : response.data,
                date : new Date().toISOString()
              })
            }

         };
         } catch (error) {
         console.error("Error initializing conversation:", error);
         }
      },
      _sendMessage() {
        console.log("active conv name ", this.activeConversation);
         if (this.message_tosend.trim() !== "") {
           const request = {  type : "message"  , action: this.message_tosend , conversation : this.activeConversation , chatType : this.chatType};
            sendMessage(JSON.stringify(request));
            this.message_tosend = ""; 
         }
      },
      toggleEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker 
        console.log(this.showEmojiPicker);
      }, 
      addEmojiToInput(event) {
        this.message_tosend+=event.detail.unicode 
        this.showEmojiPicker = false 
      }
   }
};




</script>