<template>
    <section class="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
  <div class="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:shadow-3xl">
    <div class="text-center mb-8">
      <div class="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Join Talksy</h2>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Create your account to get started</p>
    </div>

    <div class="space-y-6">
      <div class="space-y-3">
        <label for="email" class="block text-sm font-semibold text-gray-900 dark:text-white">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          class="w-full px-4 py-4 text-sm border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 border-gray-200 dark:bg-gray-700/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500" 
          placeholder="name@company.com" 
          required>
      </div>

      <div class="space-y-3">
        <label for="username" class="block text-sm font-semibold text-gray-900 dark:text-white">Username</label>
        <input 
          type="text" 
          id="username" 
          v-model="username" 
          class="w-full px-4 py-4 text-sm border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 border-gray-200 dark:bg-gray-700/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500" 
          placeholder="Choose a username" 
          required>
      </div>

      <div class="space-y-3">
        <label for="password" class="block text-sm font-semibold text-gray-900 dark:text-white">Password</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          class="w-full px-4 py-4 text-sm border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 border-gray-200 dark:bg-gray-700/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500" 
          placeholder="••••••••" 
          required>
      </div>

      <div class="space-y-3">
        <label for="confirm-password" class="block text-sm font-semibold text-gray-900 dark:text-white">Confirm Password</label>
        <input 
          type="password" 
          id="confirm-password" 
          v-model="confirm_password" 
          class="w-full px-4 py-4 text-sm border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 border-gray-200 dark:bg-gray-700/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500" 
          placeholder="••••••••" 
          required>
        <ErrorMessage v-if="showErrorMessage" :message="errorMessage" class="mt-3 text-red-500" />
        <SuccessMessage v-if="showSuccessMessage" :message="successMessage" class="mt-3 text-green-500"/>
      </div>

      <div class="pt-6">
        <button 
          type="submit" 
          @click="register()" 
          class="w-full px-6 py-4 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
          <span class="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Create Account
          </span>
        </button>
      </div>

      <div class="relative my-8">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-200 dark:border-gray-600"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Already have an account?</span>
        </div>
      </div>

      <div class="text-center">
        <router-link to="/login" class="inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200">
          Sign in here
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
import ErrorMessage from '../common/ErrorMessage.vue';
import SuccessMessage from '../common/SuccessMessage.vue';

export default {
    components : {
      ErrorMessage,
      SuccessMessage
    },
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirm_password: '', 
            showErrorMessage : false, 
            errorMessage : "" ,
            showSuccessMessage : false,
            successMessage : ""
        }
    },

    methods: {
        register() {
            console.log();
            const url = "http://localhost:3000";

            if (this.password !== this.confirm_password) {
                this.showErrorMessage = true ; 
                this.errorMessage = "Passwords do not match" ; 
            }


            fetch(url+"/registration", {
                method: "POST",
                mode: "cors",
                headers: {
                "Content-Type": "Application/json",
                },
                credentials: "include",
                body: JSON.stringify({ username : this.username, email : this.email, password : this.password}),
            })
                .then((response) => {
                    if (response.ok) {
                        this.email = "";
                        this.username = "" ; 
                        this.password = "" ; 
                        this.confirm_password = "" ; 
                        if (this.showErrorMessage) {
                            this.showErrorMessage = false ;
                        }
                        this.showSuccessMessage = true ; 
                        this.successMessage = "New account added"
                        setTimeout(() => {
                          this.$router.push("/login");
                        }, 2000);
                    }else {
                        response.json().then(data => {
                          this.showErrorMessage = true;
                          this.errorMessage = data.message;
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }
}


</script>
