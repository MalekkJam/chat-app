<template>
   
   <div class="flex items-start gap-2.5">
    <img class="w-8 h-8 rounded-full" src="../assets/images/user_photo.png" alt="User image">
    <div class="flex flex-col gap-1 w-full max-w-[320px]">
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
        <span class="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
      </div>
      <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <p class="text-sm font-normal text-gray-900 dark:text-white">
          That's awesome. I think our users will really appreciate the improvements.
        </p>
      </div>
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
      <input type="text" v-model="message" class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
      <button @click="_sendMessage()" type="submit" class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
      >Send message</button>
    </div>
  </div>

</template>
<script>
import { initWebSocket, sendMessage  } from '@/services/websocket';

export default {
   data()  {
      return {
         message : "",
         messages : []
      }
   }, 
   async mounted()  {
      try {
         const socket = await initWebSocket() ; 
         socket.onmessage = (event) => {
            const response = JSON.parse(event.data) 
            if (response.type === "request" && request.action === "loadMessages") {
               this.messages = request.data
               console.log(this.messages)
            }
         }
      }
      catch(error) {
         console.error("Error initiliazing the websocket")
      }
   },
   methods : { 
      _sendMessage() {
         if (this.message.trim() !== "") {
            const request = {  type : "message"  , action: this.message };
            sendMessage(JSON.stringify(request));
            this.message = ""; // Clear the input field
         }
      },
   }
};




</script>