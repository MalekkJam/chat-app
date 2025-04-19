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
import { onMounted } from 'vue';
import { initWebSocket, sendMessage } from '@/services/websocket';

export default {
   data()  {
      return {
         message : "",
      }
   }, 
   setup() {
      onMounted(async () => {
         await initWebSocket();
      });
   },
   methods : { 
      _sendMessage() {
         if (this.message.trim() !== "") {
            const token = document.cookie
              .split('; ')
              .find(row => row.startsWith('auth_token='))
              ?.split('=')[1];
            console.log(token)
            // Ensure the message is not empty
            sendMessage(this.message,token); // Send the message as a string
            console.log("Message sent:", this.message); // Log the message
            this.message = ""; // Clear the input field
         } else {
            console.log("Cannot send an empty message");
            // add error handling for the empty message
         }
      }
   }
};




</script>