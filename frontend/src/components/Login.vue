<template>
<section class="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
  <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
    <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white">Login to your account</h2>

    <div class="mt-6 space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          class="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="name@company.com" 
          required>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          class="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="••••••••" 
          required>
        <ErrorMessage v-if="showError" :message="errorMessage" class="mt-2 text-red-500" />
      </div>

      <button 
        type="submit" 
        @click="login()" 
        class="w-full px-5 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700">
        Login
      </button>

      <p class="text-sm text-center text-gray-600 dark:text-gray-400">
  Don't have an account? 
  <router-link to="/register" class="font-medium text-blue-600 hover:underline dark:text-blue-400">
    Sign up here
  </router-link>
</p>

    </div>
  </div>
</section>
</template>

<script>
import ErrorMessage from './ErrorMessage.vue';

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
            const data = await response.json();
            console.log("Response data:", data);
            this.$router.push("/");
            this.showError = false; 
          } else if (response.status === 400) {
            this.showError = true;
            this.errorMessage = "Invalid credentials. Please try again."; 
          } else {
            this.showError = true;
            this.errorMessage = "Something went wrong. Please try again later.";
          }
        })
        .catch((error) => {
          console.log("Network error :"+error) 
          this.showError = true;
          this.errorMessage = "Network error. Please check your connection.";
        })
        }
        else {
          alert("Please fill in all fields");
        }
  },
}};
</script>
