<template>
    
    <nav aria-label="menu nav" class="bg-gray-800 h-16 w-full fixed top-0 z-20 flex items-center px-4">

<div class="flex justify-between w-full">
    <div class="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
        <a href="#" aria-label="Home">
            <span class="text-xl pl-2"><i class="em em-grinning"></i></span>
        </a>
    </div>

    <!-- <div class="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2">
        <span class="relative w-full">
            <input aria-label="search" type="search" id="search" placeholder="Search" class="w-full bg-gray-900 text-white transition border border-transparent focus:outline-none focus:border-gray-400 rounded py-3 px-2 pl-10 appearance-none leading-normal">
            <div class="absolute search-icon" style="top: 1rem; left: .8rem;">
                <svg class="fill-current pointer-events-none text-white w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                </svg>
            </div>
        </span>
    </div> -->

    <div class="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
                <div class="relative inline-block">
                    <button @click="toggleMenu()" class="drop-button text-white py-2 px-2"> <span class="pr-2">🤖</span> Hi, {{ username }}<svg class="h-3 fill-current inline"  viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg></button>
                    <div id="myDropdown" v-if="isMenuOpen" class="dropdownlist absolute bg-gray-800 text-white right-0 mt-3 p-3 overflow-auto z-30">
                        <button href="#" class="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block">
                          <img src="../assets/images/profile-picture.png" class="w-4 h-4 inline-block filter invert">
                          Profile</button>
                        <button href="#" class="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block">
                          <img src="../assets/images/settings.png" class="w-4 h-4 inline-block filter invert">
                          Settings</button>
                        <button @click="logout()" class="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block">
                            <img src="../assets/images/logout.png" class="w-4 h-4 inline-block filter invert"> Log Out
                        </button>
                    </div>
                </div>
    </div>
</div>

</nav>
</template>
<script>

import { initWebSocket , sendMessage } from '@/services/websocket';
export default {

  data() {
    return {
      isMenuOpen: false,
      username: "",
    };
  },
  async created() {
    try {
      const socket = await initWebSocket() ; 
      const request = {  type : "request"  , action: "getUsername" };
      sendMessage(JSON.stringify(request));
      socket.onmessage = (event) => {
        const response = JSON.parse(event.data) 
        
        if (response.type === "response" && response.action === "getUsername") {
          this.username = response.data
          console.log(this.username)
          }
      }
      }
      catch(error) {
        console.error("Error initialising socket"); 
      }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    logout() {
      const url = "http://localhost:3000";

      fetch(url + "/logout", {
        method: "POST",
        mode: "cors",
        credentials: "include",
      }).then((Response) => {
        if (Response.status == 200) {
          this.$router.push("/login");
        }
      });
    },
  },
};
</script>