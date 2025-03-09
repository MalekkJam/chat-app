<template>
    <div class="w-auto p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <slot :message="message" class="font-bold"></slot>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        errorMessages: {
          email: "Invalid email address", 
          password: "Password must be at least 6 characters",
        },
      };
    },
    computed: {
      message() {
        return this.errorMessages[this.name] || "";
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add styles if needed */
  </style>
  