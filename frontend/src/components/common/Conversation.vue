<template>
  <div class="p-4 md:p-6">
    <div class="relative overflow-hidden shadow-md sm:rounded-lg bg-white dark:bg-gray-800">
      <!-- Chat Header -->
      <div class="p-4 border-b dark:border-gray-700">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ this.activeConversation }} 
        </h3>
      </div>

      <!-- Messages Container -->
      <div class="h-[calc(100vh-300px)] overflow-y-auto p-4 space-y-4">
        <div 
          v-for="(message, index) in messages"
          :key="index"
          class="flex gap-3"
          :class="{'justify-end': message.isCurrentUser}"
        >
          <img
            v-if="!message.isCurrentUser"
            class="w-8 h-8 rounded-full mt-1"
            src="../assets/images/profile.png"
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
              class="mt-1 p-3 rounded-lg max-w-[80%]"
              :class="message.isCurrentUser 
                ? 'bg-blue-100 dark:bg-blue-900/30 rounded-tr-none' 
                : 'bg-gray-100 dark:bg-gray-700 rounded-tl-none'"
            >
              <p class="text-sm text-gray-900 dark:text-white">
                {{ message.content }}
              </p>
            </div>
            
            <span class="text-xs mt-1 text-gray-500 dark:text-gray-400">
              {{ message.status }}
            </span>
          </div>

          <img
            v-if="message.isCurrentUser"
            class="w-8 h-8 rounded-full mt-1"
            src="../assets/images/current-user.png"
            alt="Your profile"
          />
        </div>
      </div>

      <!-- Message Input -->
      <div class="p-4 border-t dark:border-gray-700">
        <div class="flex gap-2">
          <input
            type="text"
            v-model="message_tosend"
            @keyup.enter="_sendMessage"
            class="flex-1 p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Type your message..."
          />
          <button
            @click="_sendMessage"
            class="px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
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
<script>
import { initWebSocket, sendMessage  } from '@/services/websocket.service';

export default {
   data()  {
      return {
         message_tosend : "",
         messages : [], 
         activeConversation : "",
      }
   }, 
   async mounted()  {
      await this.initializeConversation()
   },
   watch: {
    // Watch for changes in the route parameter
    "$route.params.conversation": {
      immediate: true, // Trigger the watcher immediately on component load
      handler() {
        this.initializeConversation();
      },
    },
  },
   methods : { 
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
          };
         sendMessage(JSON.stringify(request));

         socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
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
         if (this.message_tosend.trim() !== "") {
           const request = {  type : "message"  , action: this.message_tosend , conversation : this.activeConversation};
            sendMessage(JSON.stringify(request));
            this.message_tosend = ""; 
         }
      },
   }
};




</script>