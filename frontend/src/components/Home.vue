<template>

      <!-- Navbar at the top -->
      <!-- <Navbar></Navbar>
        <Sidebar></Sidebar> -->
        <Conversation class="flex-1 bg-blue-100 p-4 overflow-y-auto ml-5"></Conversation>

  </template>
<script>
import Navbar from "@/components/Navbar.vue" 
import Sidebar from "@/components/Sidebar.vue" 
import Main from "@/components/Main.vue"
import Conversation from "@/components/Conversation.vue"

export default {
    mounted() {
        const url = "http://localhost:3000";
        fetch(url + "/verifyToken", {
            method : "POST", 
            mode: "cors",
            headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        }).then(async (Response) => {
            if (Response.status != 200)
                this.$router.push("/login") ; 
        })
    }
}
</script>