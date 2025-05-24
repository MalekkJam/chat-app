<template>
<section class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
  <div class="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:shadow-3xl">
    <div class="text-center mb-8">
      <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Sign in to continue to Talksy</p>
    </div>

    <div class="space-y-6">
      <div class="space-y-3">
        <label for="email" class="block text-sm font-semibold text-gray-900 dark:text-white">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          class="w-full px-4 py-4 text-sm border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50/50 border-gray-200 dark:bg-gray-700/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500" 
          placeholder="name@company.com" 
          required>
      </div>

      <div class="space-y-3">
        <label for="password" class="block text-sm font-semibold text-gray-900 dark:text-white">Password</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          class="w-full px-4 py-4 text-sm border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50/50 border-gray-200 dark:bg-gray-700/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500" 
          placeholder="••••••••" 
          required>
        <ErrorMessage v-if="showError" :message="errorMessage" class="mt-3 text-red-500" />
      </div>

      <div class="pt-6">
        <button 
          type="submit" 
          @click="login()" 
          class="w-full px-6 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
          <span class="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Sign In
          </span>
        </button>
      </div>

      <div class="relative my-8">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-200 dark:border-gray-600"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">New to Talksy?</span>
        </div>
      </div>

      <div class="text-center">
        <router-link to="/register" class="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
          Create your account
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </router-link>
      </div>

    </div>
  </div>
</section>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      password: '', 
      showError : false, 
      errorMessage : "" 
    };
  },
  methods: {
    login() {
      const url = "http://localhost:3000";

      if (this.email && this.password) {

        fetch(url + "/login", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email: this.email, password: this.password }),
        })
        .then(async (response) => {
          if (response.status === 200) {
           this.$router.push("/")
          } else {
            const data = await response.json();
            this.showError = true;
            this.errorMessage = data.message || "Login failed.";
          }
        })
        .catch((error) => {
          console.log("Network error :"+error) 
          this.showError = true;
          this.errorMessage = "Network error. Please check your connection.";
        })
        }
        else {
          this.showError = true;
          this.errorMessage = "Please fill in all fields.";
        }
  },
}};
</script>
