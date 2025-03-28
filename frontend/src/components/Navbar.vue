<template>
    
    <nav class="bg-gray-50 dark:bg-gray-800 p-4 flex justify-between items-center shadow-md">
    <div class="text-xl font-semibold text-gray-900 dark:text-white">My App</div>
    <div class="relative">
      <button @click="toggleMenu" class="focus:outline-none">
        <img 
          src="../assets/images/user_photo.png"
          alt="Profile" 
          class="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600"
        />
      </button>
      <div 
        v-if="isMenuOpen" 
        class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-600"
      >
      <ul>
        <li>
          <a href="#" class="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">Settings</a>

        </li>
        <li>
          <button @click="logout()" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white pr-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
            </svg>
            <span>Log Out</span>
          </button>
        </li>
      </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    logout() {
      const url = "http://localhost:3000";

      fetch(
        url + "/logout" , {
          method : "POST", 
          mode : "cors" , 
          credentials : "include"
        }
      ).then(async(Response)=> {
        if (Response.status == 200) {
          this.$router.push("/login")
        }
      })
    }
  },
};</script>