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
      async mounted() {
         const url = "http://localhost:3000";

         fetch(url+"/getConversations",{
            method : "GET",
            mode : "cors",
            headers : {
            "Content-Type": "Application/json",
          },
          credentials: "include",
         }).then(async (response)=> {
            if (response.status == 200) 
               this.conversations = await response.json()
            
         })
      },
      methods : {
         changeConversation(conversation) {
            this.$router.push("/conversation/"+conversation) 
         }
      }
   }


</script>