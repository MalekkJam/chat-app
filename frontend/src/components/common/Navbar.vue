<template>
  <nav aria-label="menu nav" class="bg-gray-800 h-16 w-full fixed top-0 z-20 flex items-center px-4">
    <div class="flex justify-between w-full">
      <!-- Logo Section -->
      <div class="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white items-center">
        <a href="/" @click.prevent="$router.push('/')" aria-label="Home" class="flex items-center space-x-2">
          <img src="../../assets/images/talksy.png" alt="Talksy Logo" class="h-8 w-8">
          <span class="text-2xl font-semibold">Talksy</span>
        </a>
      </div>

      <!-- User Menu Section -->
      <div class="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
        <div class="relative inline-block">
          <button @click="toggleMenu()" class="drop-button text-white py-2 px-2">
            <span class="pr-2">🤖</span> Hi, {{ username }}
            <svg class="h-3 fill-current inline" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>
          <div id="myDropdown" v-if="isMenuOpen" class="dropdownlist absolute bg-gray-800 text-white right-0 mt-3 p-3 overflow-auto z-30">
            <button v-if="!isAdmin" @click="goToSettings()" class="p-2 hover:bg-gray-700 text-white text-sm no-underline hover:no-underline block">
              <img src="../../assets/images/settings.png" class="w-4 h-4 inline-block filter invert">
              Settings
            </button>
            <button @click="logout()" class="p-2 hover:bg-gray-700 text-white text-sm no-underline hover:no-underline block">
              <img src="../../assets/images/logout.png" class="w-4 h-4 inline-block filter invert">
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