<template>
    <Navbar></Navbar>
    <Sidebar></Sidebar>

</template>
<script>
import Navbar from "@/components/Navbar.vue" 
import Sidebar from "@/components/Sidebar.vue" 
import { watch } from "vue"

export default {
    watch() {
        console.log("Hola todos ! ")
    }
}

</script>