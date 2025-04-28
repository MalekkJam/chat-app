<template>

    <div class="px-4 md:px-10 mx-auto w-full pt-10">
      <div class="flex flex-wrap mt-4">
        <div class="w-full px-4">
          <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg shadow-xl">
            <div class="rounded-t mb-0 px-4 py-3 border-0">
              <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 class="font-semibold text-lg text-gray-800">
                    Users Management
                  </h3>
                </div>
                <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button class="bg-blue-500 text-white active:bg-blue-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button">
                    Export
                  </button>
                </div>
              </div>
            </div>
            <div class="block w-full overflow-x-auto">
              <table class="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Username
                    </th>
                    <th class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Email
                    </th>
                    <th class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Status
                    </th>
                    <th class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in users" :key="index">
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <i class="fas fa-user text-gray-600"></i>
                        </div>
                        <div class="ml-4">
                          <p class="text-gray-800 font-semibold">
                            {{ user.username }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs text-gray-800 p-4">
                      {{ user.email }}
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <span :class="`px-2 py-1 rounded-full text-xs font-semibold ${user.active ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`">
                        {{ user.active ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs text-gray-800 p-4">
                    {{ user.joined_at }}
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div class="flex space-x-2">
                        <button class="text-blue-500 hover:text-blue-700">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="text-red-500 hover:text-red-700">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="px-4 py-3 border-t border-gray-200 bg-gray-50">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    Showing <span class="font-medium">1</span> to <span class="font-medium">10</span> of <span class="font-medium">{{ users.length }}</span> users
                  </p>
                </div>
                <div class="flex space-x-2">
                  <button class="px-3 py-1 border rounded text-gray-600 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button class="px-3 py-1 border rounded text-gray-600 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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

  </script>