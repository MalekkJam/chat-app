<template>
  <div class="flex flex-col h-screen">
    <!-- Navbar at the top -->
    <header class="flex-shrink-0">
      <Navbar></Navbar>
    </header>

    <!-- Main content area -->
    <div class="flex flex-1">
      <!-- Sidebar on the left -->
      <Sidebar class="w-64 flex-shrink-0"></Sidebar>

      <!-- Main content on the right -->
      <section class="pt-20 pl-70 rounded-tl-lg bg-white shadow">
        <router-view></router-view>
      </section>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue" 
import Sidebar from "@/components/Sidebar.vue" 

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