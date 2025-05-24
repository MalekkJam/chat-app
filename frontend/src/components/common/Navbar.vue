<template>
  <nav aria-label="menu nav" class="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 h-16 w-full fixed top-0 z-20 flex items-center px-6 shadow-xl border-b border-gray-700/50 backdrop-blur-sm">
    <div class="flex justify-between w-full">
      <!-- Logo Section -->
      <div class="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white items-center">
        <a href="/" @click.prevent="$router.push('/')" aria-label="Home" class="flex items-center space-x-3 hover:scale-105 transition-transform duration-200">
          <div class="relative">
            <img src="../../assets/images/talksy.png" alt="Talksy Logo" class="h-10 w-10 rounded-lg shadow-lg">
            <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <span class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Talksy</span>
        </a>
      </div>

      <!-- User Menu Section -->
      <div class="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
        <div class="relative inline-block">
          <button @click="toggleMenu()" class="drop-button text-white py-3 px-4 hover:bg-gray-700/50 rounded-xl transition-all duration-200 flex items-center gap-2 font-medium">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
              {{ username.charAt(0).toUpperCase() }}
            </div>
            <span>Hi, {{ username }}</span>
            <svg class="h-3 fill-current transition-transform duration-200" :class="{ 'rotate-180': isMenuOpen }" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>
          <div id="myDropdown" v-if="isMenuOpen" class="dropdownlist absolute bg-gray-800/95 backdrop-blur-sm text-white right-0 mt-3 p-2 overflow-auto z-30 rounded-xl shadow-2xl border border-gray-700/50 min-w-[200px] animate-fade-in-up">
            <button v-if="!isAdmin" @click="goToSettings()" class="w-full p-3 hover:bg-gray-700/50 text-white text-sm no-underline hover:no-underline rounded-lg transition-all duration-200 flex items-center gap-3">
              <div class="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <img src="../../assets/images/settings.png" class="w-4 h-4 filter invert">
              </div>
              Settings
            </button>
            <button @click="logout()" class="w-full p-3 hover:bg-red-500/20 text-white text-sm no-underline hover:no-underline rounded-lg transition-all duration-200 flex items-center gap-3 hover:text-red-300">
              <div class="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                <img src="../../assets/images/logout.png" class="w-4 h-4 filter invert">
              </div>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      isAdmin : false , 
      username: "",
    };
  },
  async mounted() {
      this.fetchUsername() 
      this.verifyAdminRole()
      }    , 
  methods: {
    fetchUsername () {
      const url = "http://localhost:3000"

      fetch(url+"/getUsername",{
              method : "GET",
              mode : "cors",
              headers : {
              "Content-Type": "Application/json",
            },credentials : "include"})
            .then(async(response) => {
              if (response.status == 302) {
                const data = await response.json()
                this.username = data.username
              }
            })
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    logout() {
          this.isMenuOpen = false
        const url = "http://localhost:3000"
        fetch (url +"/logout", {
          method : "POST",
          mode: "cors",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        }).then((response) => {
          if (response.status == 200) 
            this.$router.push("/login")
        })
    }, 
    goToSettings() {
      this.isMenuOpen = false
      this.$router.push("/settings")
    }, 
    verifyAdminRole() {
        const url = "http://localhost:3000";

        fetch(url+"/verifyAdminRole", {
          method : "POST",
          mode : "cors", 
          headers : {
          "Content-Type" : "Application/json"
        }, 
        credentials : "include" 
        }).then((response) => {
          if (response.status == 200) {
            this.isAdmin = true ; 
          }
        })
      }
  },
};
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.2s ease-out;
}
</style>