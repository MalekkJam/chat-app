<template>
    <section class="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div class="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div class="flex items-center justify-between mb-8">  <!-- Increased mb-6 to mb-8 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h2>
          <router-link to="/" class="text-sm text-blue-600 hover:underline dark:text-blue-400">
            Back
          </router-link>
        </div>
  
        <div class="space-y-8">  <!-- Increased space-y-6 to space-y-8 -->
          <!-- Profile Section -->
          <div class="p-6 border rounded-lg dark:border-gray-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Profile Information</h3>  <!-- Increased mb-4 to mb-6 -->
            <div class="space-y-6">  <!-- Increased space-y-4 to space-y-6 -->
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">  <!-- Increased gap-4 to gap-6 -->
                <div class="mb-4">  <!-- Added mb-4 -->
                  <label for="firstName" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Username</label>  <!-- Added mb-2 -->
                  <input 
                    type="text" 
                    v-model="username"
                    id="username" 
                    class="w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                    :disabled="!isEditing">
                </div>
                <ErrorMessage v-if="showError1" :message="errorMessage" class="mt-2 text-red-500"></ErrorMessage>
                <SuccessMessage v-if="showSuccess1" :message="successMessage" class="mt-2 text-green-500"></SuccessMessage>
              </div>
            </div>
            <button @click ="edit()" class="mt-6 px-4 py-2 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">  <!-- Increased mt-4 to mt-6 -->
              Edit Profile
            </button>
            <button
              @click="saveUsernameUpdate()"
              :disabled="!isEditing"
              class="px-5 py-2 text-sm font-medium text-white transition rounded-lg focus:outline-none focus:ring-4 dark:focus:ring-green-700"
              :class="isEditing ? 'bg-green-600 hover:bg-green-700 focus:ring-green-300' : 'bg-gray-400 cursor-not-allowed'"
            >
              Update
            </button>
          </div>
  
          <!-- Security Section -->
          <div class="p-6 border rounded-lg dark:border-gray-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Security</h3>  <!-- Increased mb-4 to mb-6 -->
            <div class="space-y-6">  <!-- Increased space-y-4 to space-y-6 -->
              <div class="mb-4">  <!-- Added mb-4 -->
                <label for="currentPassword" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Current Password</label>  <!-- Added mb-2 -->
                <input 
                  type="password" 
                  id="currentPassword" 
                  v-model="current_password"
                  class="w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                  placeholder="••••••••">
              </div>
              <div class="mb-4">  <!-- Added mb-4 -->
                <label for="newPassword" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">New Password</label>  <!-- Added mb-2 -->
                <input 
                  type="password" 
                  id="newPassword" 
                  v-model="new_password"
                  class="w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                  placeholder="••••••••">
              </div>
              <div class="mb-6">  <!-- Added mb-6 -->
                <label for="confirmPassword" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Confirm New Password</label>  <!-- Added mb-2 -->
                <input 
                  type="password" 
                  id="confirmPassword" 
                  v-model="confirm_new_password"
                  class="w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                  placeholder="••••••••">
              </div>
                <ErrorMessage v-if="showError2" :message="errorMessage" class="mt-2 text-red-500"></ErrorMessage>
                <SuccessMessage v-if="showSuccess2" :message="successMessage" class="mt-2 text-green-500"></SuccessMessage>
              </div>
            <button @click="updatePassword()" class="mt-6 px-5 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700">  <!-- Increased mt-4 to mt-6 -->
              Update Password
            </button>
          </div>
  
          <!-- Danger Zone -->
          <div class="p-6 border border-red-200 rounded-lg bg-red-50 dark:bg-gray-700 dark:border-red-800">
    <h3 class="text-lg font-medium text-red-800 dark:text-red-400 mb-4">Danger Zone</h3>
    <p class="text-sm text-red-600 dark:text-red-300 mb-6">Deleting your account is permanent and cannot be undone.</p>
    <button 
      @click="showDeleteConfirm = true"
      class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700">
      Delete Account
    </button>
  </div>

  <!-- Add this at the bottom of your template -->
  <Popup v-if="showDeleteConfirm"
    @confirm="deleteAccount"
    @cancel="showDeleteConfirm = false"></Popup>
        </div>
      </div>
    </section>
  </template>
  
<script>

import { initWebSocket, sendMessage  } from '@/services/websocket.service';

export default {
  data() {
    return {
      username: "",
      isEditing : false , 
      showError1 : false , 
      showSuccess1 : false , 
      showError2 : false , 
      showSuccess2 : false , 
      current_password : "", 
      new_password :"" , 
      confirm_new_password : "" ,
      url : "http://localhost:3000" ,
      showDeleteConfirm: false, 
    };
  },
  mounted() {
    fetch(this.url+"/getUserInfo", {
        method : "GET",
        mode : "cors", 
        headers : {
            "Content-Type" : "Application/json"
        }, 
        credentials : "include"
    }).then(async(response) => {
        if (response.status == 200) {
            const {username, email} = await response.json()
            this.username = username
            this.email = email
        }
    })
  }
  ,methods : {
    edit() {
        this.isEditing = true 
    },
    saveUsernameUpdate() {    
        fetch(this.url+"/updateUserData", {
            method : "put", 
            mode : "cors",
            headers : {
                "Content-Type" : "Application/json",
            },
            credentials : "include",
            body : JSON.stringify({data : "username" , new_username : this.username })
        }).then(async (response) => {
            const data = await response.json();
            if (response.ok) {
                this.isEditing = false 
                if (this.showError1) 
                    this.showError1 = false 
                this.showSuccess1 = true 
                this.successMessage = data.message;
                this.sendRefreshRequest() 
            }
            else {
                if(this.showSuccess1) {
                    this.showSuccess1 = false 
                }
                this.showError1 = true 
                this.errorMessage = data.message
              } setTimeout(()=> {
                this.showSuccess1 = false 
                this.showError1 = false 
                this.errorMessage = "" 
                this.successMessage = ""
            }, 9000)
            })
           
    }, 
    async sendRefreshRequest() {
      const socket = await initWebSocket() 
      const request = {
        type : "updateUsernames", 
      }
      console.log("baathneh");
      sendMessage(JSON.stringify(request))
    } , 
    updatePassword() {
        fetch(this.url+"/updateUserData", {
            method : "PUT",
            mode : "cors",
            headers : {
                "Content-Type" : "Application/json",
            },
            credentials : "include",
            body : JSON.stringify({data : "password" , current_password : this.current_password, new_password : this.new_password, confirm_new_password : this.confirm_new_password }) 
        }).then(async (response) => {
            const data = await response.json();
            if (response.ok) {
                this.isEditing = false 
                if (this.showError2) 
                    this.showError2 = false 
                this.showSuccess2 = true 
                this.successMessage = data.message;
            }
            else {
                if(this.showSuccess2) {
                    this.showSuccess2 = false 
                }
                this.showError2 = true 
                this.errorMessage = data.message
            }})
            setTimeout(()=> {
                this.showSuccess2 = false 
                this.showError2 = false 
                this.errorMessage = "" 
                this.successMessage = ""
            }, 5000)
    }, 
    deleteAccount() {
      fetch(this.url+"/deleteAccount", {
            method : "delete", 
            mode : "cors",
            headers : {
                "Content-Type" : "Application/json",
            },
            credentials : "include",
      }).then(async (response) => {
        if (response.ok) {
          // Show success message (optional)
          this.showSuccess = true;
          this.successMessage = 'Account deleted successfully';
          
          // Redirect to login after a small delay
          setTimeout(() => {
            this.$router.push('/login');
          }, 1000);
          
        } else {
          console.error("Error deleting the user")
        }
      })
  }}
  }
</script>