<template>
    <section class="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
  <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
    <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white">Create an account</h2>

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
        <label for="username" class="block text-sm font-medium text-gray-900 dark:text-white">Username</label>
        <input 
          type="text" 
          id="username" 
          v-model="username" 
          class="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="xyz" 
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
      </div>

      <div>
        <label for="confirm-password" class="block text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
        <input 
          type="password" 
          id="confirm-password" 
          v-model="confirm_password" 
          class="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="••••••••" 
          required>
        <ErrorMessage v-if="showErrorMessage" :message="errorMessage" class="mt-2 text-red-500" />
        <SuccessMessage v-if="showSuccessMessage" :message="successMessage" class="mt-2 text-green-500"/>
      </div>

      <button 
        type="submit" 
        @click="register()" 
        class="w-full px-5 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700">
        Create an account
      </button>

      <p class="text-sm text-center text-gray-600 dark:text-gray-400">
        Already have an account? 
        <router-link to="/login"class="font-medium text-blue-600 hover:underline dark:text-blue-400">Login here</router-link>
      </p>
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
