<template>
    <Navbar></Navbar>
    <Sidebar></Sidebar>
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