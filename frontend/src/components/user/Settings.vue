<template>
    <section class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div class="w-full max-w-4xl p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/50">
        <div class="flex items-center justify-between mb-10">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Account Settings</h2>
              <p class="text-gray-600 dark:text-gray-400 mt-1">Manage your profile and security preferences</p>
            </div>
          </div>
          <router-link to="/" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Chat
          </router-link>
        </div>
  
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Profile Section -->
          <div class="p-8 border-2 border-gray-200 dark:border-gray-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-750">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">Profile Information</h3>
            </div>
            <div class="space-y-6">
              <div>
                <label for="firstName" class="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Username</label>
                <input 
                  type="text" 
                  v-model="username"
                  id="username" 
                  class="w-full px-4 py-3 text-sm border-2 rounded-xl bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                  :disabled="!isEditing">
              </div>
              <ErrorMessage v-if="showError1" :message="errorMessage" class="mt-2 text-red-500"></ErrorMessage>
              <SuccessMessage v-if="showSuccess1" :message="successMessage" class="mt-2 text-green-500"></SuccessMessage>
            </div>
            <div class="flex gap-3 mt-8">
              <button @click ="edit()" class="flex-1 px-6 py-3 text-sm font-semibold text-blue-600 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-xl transition-all duration-200 hover:scale-[1.02]">
                {{ isEditing ? 'Cancel' : 'Edit Profile' }}
              </button>
              <button
                @click="saveUsernameUpdate()"
                :disabled="!isEditing"
                class="flex-1 px-6 py-3 text-sm font-semibold text-white rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                :class="isEditing ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:ring-green-300 shadow-lg hover:shadow-xl' : 'bg-gray-400 cursor-not-allowed'"
              >
                Save Changes
              </button>
            </div>
          </div>
  
          <!-- Security Section -->
          <div class="p-8 border-2 border-gray-200 dark:border-gray-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-750">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">Security Settings</h3>
            </div>
            <div class="space-y-6">
              <div>
                <label for="currentPassword" class="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Current Password</label>
                <input 
                  type="password" 
                  id="currentPassword" 
                  v-model="current_password"
                  class="w-full px-4 py-3 text-sm border-2 rounded-xl bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200" 
                  placeholder="••••••••">
              </div>
              <div>
                <label for="newPassword" class="block text-sm font-semibold text-gray-900 dark:text-white mb-3">New Password</label>
                <input 
                  type="password" 
                  id="newPassword" 
                  v-model="new_password"
                  class="w-full px-4 py-3 text-sm border-2 rounded-xl bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200" 
                  placeholder="••••••••">
              </div>
              <div>
                <label for="confirmPassword" class="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Confirm New Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  v-model="confirm_new_password"
                  class="w-full px-4 py-3 text-sm border-2 rounded-xl bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200" 
                  placeholder="••••••••">
              </div>
              <ErrorMessage v-if="showError2" :message="errorMessage" class="mt-2 text-red-500"></ErrorMessage>
              <SuccessMessage v-if="showSuccess2" :message="successMessage" class="mt-2 text-green-500"></SuccessMessage>
            </div>
            <button @click="updatePassword()" class="mt-8 w-full px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
              <span class="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Update Password
              </span>
            </button>
          </div>
  
          <!-- Danger Zone -->
          <div class="lg:col-span-2 p-8 border-2 border-red-200 dark:border-red-800 rounded-2xl shadow-lg bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-red-800 dark:text-red-400">Danger Zone</h3>
            </div>
            <p class="text-sm text-red-600 dark:text-red-300 mb-6">Deleting your account is permanent and cannot be undone. All your data will be lost forever.</p>
            <button 
              @click="showDeleteConfirm = true"
              class="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-300 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
              <span class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Account
              </span>
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