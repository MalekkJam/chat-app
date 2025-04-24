<template>
   <div class="flex flex-col gap-4"> <!-- Add flex-col here for vertical stacking -->
     <div
       class="flex items-start gap-2.5"
       v-for="(message, index) in messages"
       :key="index"
     >
       <img
         class="w-8 h-8 rounded-full"
         src="../assets/images/profile.png"
         alt="User image"
       />
       <div class="flex flex-col gap-1 w-full max-w-[320px]">
         <div class="flex items-center space-x-2 rtl:space-x-reverse">
           <span class="text-sm font-semibold text-gray-500 dark:text-gray-400">
             {{ message.username }}
           </span>
           <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
             {{ message.date }}
           </span>
         </div>
    
         <div
           class="flex flex-col leading-1.5 w-4/5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
         >
           <p class="text-sm font-normal text-gray-900 dark:text-white">
             {{ message.content }}
           </p>
         </div>
         <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
           Delivered
         </span>
       </div>
     </div>
 
     <!-- Input and Send Button -->
     <div class="flex items-center gap-2 mt-4">
       <input
         type="text"
         v-model="message_tosend"
         class="flex-1 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
         placeholder="Type a message..."
       />
       <button
         @click="_sendMessage()"
         type="submit"
         class="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
       >
         Send
       </button>
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
                username : "You",
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