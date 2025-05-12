<template>
  <nav class="bg-gray-800 h-full w-64 pt-16 fixed">
    <!-- Friend Request Buttons -->
    <div class="p-4 border-b border-gray-700 space-y-2">
      <button 
        @click="fetchNonFriendUsers"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
      >
        Send Friend Request
      </button>
      <button 
        @click="showPendingRequests"
        class="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors"
      >
        Friend Requests
      </button>
    </div>

    <!-- Existing Conversations List -->
    <ul>
      <li 
        @click="changeConversation(conversation)" 
        class="text-white p-4 hover:bg-gray-700 cursor-pointer transition-colors" 
        v-for="conversation in conversations" 
        :key="conversation"
      >
        {{ conversation }}
      </li>
    </ul>
  </nav>
<FriendPopup
  :isOpen="showRequestModal"
  :data="otherUsers"
  :type="type"
  @close="closePopUp"
  @accept="handleAccept"
  @reject="handleReject"
/>
</template>
<script>
import FriendPopup from './FriendPopup.vue';
import { initWebSocket, sendMessage  } from '@/services/websocket.service';

   export default {
      components :  {
         FriendPopup
      }, 
      data() {
         return {
            conversations: [] , 
            otherUsers : [], 
            type :"",
            url : "http://localhost:3000",
            showRequestModal : false , 
         };
      },
      async mounted() {
         this.fetchChats() 
      },
      methods : {
         fetchChats() {
            fetch(this.url+"/getConversations",{
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
         changeConversation(conversation) {
            this.$router.push("/conversation/"+conversation) 
         }, 
         fetchNonFriendUsers() {
            fetch(this.url+"/fetchNonFriendUsers",{
               method : "GET",
               mode : "cors" , 
               headers : {
                  "Content-Type" : "Application/json"
               }, 
               credentials : "include" 
            }).then(async (response) => {
               const data = await response.json() ; 
               this.otherUsers = data ; 
               this.type = "sendRequest"; 
               this.showRequestModal = true ; 
             })
         },
         closePopUp() {
            this.showRequestModal = false ; 
         }, 
         async handleAccept(type,username) {
               const socket = await initWebSocket() ; 
               console.log(type,username);
               const request = {
                  type : "request" , 
                  action : type ,
                  target : username
               }
               
               sendMessage(JSON.stringify(request)) ; 
               
               socket.onmessage = (event) => {
                  const response = JSON.parse(event.data) ; 
                  if (response.type == "response" && 
                     response.action == "sendRequest" && 
                     response.status == 200
                  ) {
                     this.fetchNonFriendUsers() ; 
                  }
               }
         }, 
         showPendingRequests() {
             fetch(this.url+"/fetchFriendshipRequests",{
               method : "GET",
               mode : "cors" , 
               headers : {
                  "Content-Type" : "Application/json"
               }, 
               credentials : "include" 
            }).then(async (response) => {
               const data = await response.json() ; 
               this.otherUsers = data ; 
               console.log(this.otherUsers);
               this.type = "manageRequest"; 
               this.showRequestModal = true ; 
             })
         }
      }
   }


</script>