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
   export default {
      data() {
         return {
            conversations: []
         };
      },
      mounted() {
         const url = "http://localhost:3000" ; 
         fetch(url + "/getConversations", {
            method : "GET", 
            mode: "cors",
            headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        }).then(async (Response) => {
            if (Response.ok) {
               this.conversations = await Response.json() ; 
            }
            // Error handling has to be added 
        })

      },
      methods : {
         changeConversation(conversation) {
            this.$router.push("/conversation/"+conversation) 
         }
      }
   }


</script>