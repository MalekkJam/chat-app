<template>



<div class="p-4 md:p-6">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
           
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Username
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Activity
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Joined at
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user of users" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ user.username }}
                    </th>
                    <td class="px-6 py-4">
                        {{ user.email }}
                    </td>
                    <td class="px-6 py-4">
                      <span :class="`px-2 py-1 rounded-full text-xs font-semibold ${user.active ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`">
                            {{ user.active ? 'Active' : 'Inactive' }}
                          </span>
                    </td>
                    <td class="px-6 py-4">
                        {{ user.joined_at }}
                    </td>
                    <td class="px-10 py-4">
                        <button @click="deleteUser(user.username)" class="font-medium text-red-600 dark:text-red-500 hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

  </template>
  
  <script>
  export default {
    data() {
        return {
            users: []
        }
    }, 
    mounted() {
      this.updateTable() ; 
    },
    methods : {
      deleteUser(username)  {
        const url = "http://localhost:3000" ; 
        fetch (url+"/deleteAccount", {
          method : "DELETE",
          mode : "cors" , 
          headers : {
            "Content-Type" : "Application/json"
          }, 
          credentials : "include", 
          body : JSON.stringify({username : username})
        }).then((response) => {
          if (response.status == 200)
            this.updateTable() 
          this.$emit('user-deleted')
        })
      },
      
      updateTable() { 
        const url = "http://localhost:3000" ; 
        fetch (url+"/getAllUsers",{
        method : "GET",
        mode : "cors", 
        headers : {
          "Content-Type" : "Application/json"
        }, 
        credentials : "include"
        }).then(async(response) => {
        const data = await response.json();
        this.users = data ; 
        })
      }
    }
  }

  </script>