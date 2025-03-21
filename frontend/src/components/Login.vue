<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 p-5">
      <div class="mb-10">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input 
          v-model="email"  
          type="email" 
          id="email" 
          class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" 
          placeholder="name@flowbite.com" 
          required 
        />
      </div>
      <div class="mb-10">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input 
          v-model="password" 
          type="password" 
          id="password" 
          class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" 
          required 
        />
      </div>
      <div class="flex items-start mb-10">
        <div class="flex items-center h-5">
          <input 
            id="terms" 
            type="checkbox" 
            value="" 
            class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" 
            required 
          />
        </div>
        <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          I agree with the 
          <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>
        </label>
      </div>
      <button  
        @click.prevent="login()"  
        type="submit" 
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Register new account
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
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
        .then((response) => {
          if (response.status == 200) {
            document.cookie.split('; ').forEach(cookie => {
              const [name, value] = cookie.split('=');
              if (name === 'auth_token') {
                console.log('Cookie Value:', value);
              }
            });
          }
        })
        .catch((error) => console.error("Fetch error:", error));
        }
        else {
          alert("Please fill in all fields");
        }
  }
}};
</script>
