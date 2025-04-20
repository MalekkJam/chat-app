<template>
  <nav class="bg-gray-800 h-full w-64 pt-16 fixed">
    <ul>
      <li @click="changeConversation(conversation)" class="text-white p-4" v-for="conversation in conversations" :key="conversation">
        {{ conversation }}
      </li>
    </ul>
  </nav>
</template>
<script>

import { sendMessage, initWebSocket } from '@/services/websocket';

   export default {
      data() {
         return {
            conversations: []
         };
      },
      async mounted() {
         try {
            const socket = await initWebSocket() ; 
            const request = {  type : "request"  , action: "getConversations" };
            sendMessage(JSON.stringify(request));
            
            socket.onmessage = (event) => {
               const response = JSON.parse(event.data) 

               if (response.type === "response" && response.action === "getConversations") {
                  this.conversations = response.data
               }
            }
         }
         catch(error) {
            console.error("Error initialising socket"); 
         }

      },
      methods : {
         changeConversation(conversation) {
            const request = {  type : "request"  , action: "loadMessages/"+conversation };
            sendMessage(JSON.stringify(request));
            this.$router.push("/conversation/"+conversation) 
         }
      }
   }


</script>