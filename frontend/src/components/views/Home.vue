<template>
  <div class="flex flex-col h-screen">
    <!-- Navbar at the top -->
    <header class="flex-shrink-0">
      <Navbar></Navbar>
    </header>

    <!-- Main content area -->
    <div class="flex flex-1">
      <!-- Sidebar on the left -->
      <Sidebar class="w-64 flex-shrink-0"
      ref="sideBar"
      ></Sidebar>

      <!-- Main content on the right -->
      <section class="flox-grow pt-14 pl-64 w-full rounded-tl-lg bg-white shadow">
        <router-view
        @new-chat-added = updateTable() 
        @chat-deleted = updateTable() 
        @user-deleted = updateTable()
        >
        </router-view>
      </section>
    </div>
  </div>
</template>

<script>
import { initWebSocket } from "@/services/websocket.service";


export default {
  async mounted() {
    try {
      const url = "http://localhost:3000";
      
      fetch(url+"/verifyToken", {
        method : "POST",
        mode : "cors", 
        headers : {
          "Content-Type" : "Application/json"
        }, 
        credentials : "include"
      }).then((Response) => {
        if (Response.status != 200) {
          this.$router.push("/login"); 
        }
      })
      // Check if the websocket exists if not will create a new one else it will redirect 
      await initWebSocket() ; 
    } catch (error) {
      console.error("Error initializing WebSocket:", error);
      this.$router.push("/login"); // Redirect to login page
    }
    }, 
  methods : {
    updateTable() {
      this.$refs.sideBar.fetchChats()
      this.$refs.sideBar.fetchFriends() 
    }
  }
}
</script>