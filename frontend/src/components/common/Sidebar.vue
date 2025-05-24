<template>
  <nav class="bg-gradient-to-b from-gray-900 to-gray-800 h-full w-64 pt-16 fixed shadow-2xl border-r border-gray-700/50">
    <!-- Friend Request Buttons -->
    <div class="p-6 border-b border-gray-700/50 space-y-4">
      <button 
        @click="fetchNonFriendUsers"
        class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Friend
      </button>
      <button 
        @click="fetchFriendRequests"
        class="w-full bg-gray-700/80 hover:bg-gray-600 text-white py-3 px-4 rounded-xl transition-all duration-200 font-medium shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        Requests
      </button>
    </div>

    <!-- Existing Conversations List -->
      <div class="border-b border-gray-700/50">
      <h3 class="text-gray-300 uppercase text-xs font-bold px-6 py-4 tracking-wider flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Rooms
      </h3>
    <ul class="px-2 pb-4">
      <li 
        @click="changeConversation(conversation)" 
        class="text-gray-200 p-3 mx-2 hover:bg-gray-700/50 cursor-pointer transition-all duration-200 rounded-lg hover:scale-[1.02] hover:shadow-md flex items-center gap-3 font-medium" 
        v-for="conversation in conversations" 
        :key="conversation"
      >
        <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        {{ conversation }}
      </li>
    </ul>
    </div>
    <div>
      <h3 class="text-gray-300 uppercase text-xs font-bold px-6 py-4 tracking-wider flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        My Friends
      </h3>
        <ul class="px-2 pb-4">
    <li 
      v-for="friend in friendsList"
      @click="changeConversation(friend.username)"
      class="text-gray-200 p-3 mx-2 hover:bg-gray-700/50 cursor-pointer transition-all duration-200 rounded-lg hover:scale-[1.02] hover:shadow-md flex items-center gap-3 font-medium"
      :key="friend"
    >
      <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
        {{ friend.username.charAt(0).toUpperCase() }}
      </div>
      {{ friend.username }}
    </li>
  </ul>
    </div>
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
            friendsList : [], 
         };
      },
      async mounted() {
         this.fetchChats() 
         this.fetchFriends()
         const socket = await initWebSocket() 

         socket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            if (data.type === "updateUsernames") {
               this.fetchFriends()
            }
         }
      },
      methods : {
         fetchChats() {
            fetch(this.url+"/getGroupConversations",{
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
            const isGroupChat = this.conversations.includes(conversation);
            
            if (isGroupChat) {
               this.$router.push("/group/" + conversation);
            } else {
               this.$router.push("/private/" + conversation);
            }

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
               const request = {
                  type : "request" , 
                  action : type ,
                  target : username
               }
               
               sendMessage(JSON.stringify(request)) ; 
               
               socket.onmessage = (event) => {
                  const response = JSON.parse(event.data) ; 
                  // Sending the request updating the table in the popup
                  if (response.type == "response" && 
                     response.action == "sendRequest" && 
                     response.status == 200
                  ) {
                     this.fetchNonFriendUsers() ; 
                  }else if (
                     response.type == "response" && 
                     response.action == "manageRequest" && 
                     response.status == 200
                  ){
                     this.fetchFriendRequests()
                     this.fetchFriends()
                  }
                  
               }             
         }, 
         async handleReject(username) {
            const socket = await initWebSocket() ; 
               const request = {
                  type : "request" , 
                  action : "rejectRequest" ,
                  sender : username
               }
               
               sendMessage(JSON.stringify(request)) ; 

               socket.onmessage = (event) => {
                  const response = JSON.parse(event.data) ; 
                  if (response.type == "response" && 
                     response.action == "rejectRequest" && 
                     response.status == 200 
                  ) {
                     this.fetchFriendRequests()
                  }
            
               }
         },
         fetchFriendRequests() {
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
               this.type = "manageRequest"; 
               this.showRequestModal = true ; 
             })
         }, 
         fetchFriends() {
            fetch(this.url +"/getMyFriends", {
               method :"GET" , 
               mode : "cors" , 
               headers : {
                  "Content-Type" : "Application/json"
               }, 
               credentials :"include"
            }).then(async (response) => {
               const data = await response.json() 
               this.friendsList = data
               console.log(this.friendsList);
            })
         }
      }
   }


</script>   