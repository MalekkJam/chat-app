<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"/> <!--Replace with your tailwind.css once created-->
    <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet"> <!--Totally optional :) -->
    


<div id="main" class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">

<div class="bg-gray-800 pt-3">
    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
        <h1 class="font-bold pl-2">Analytics</h1>
    </div>
</div>

<div class="flex flex-wrap">
    <div class="w-full md:w-1/2 xl:w-1/3 p-6">
        <!--Metric Card-->
        <div class="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
            <div class="flex flex-row items-center">
                <div class="flex-shrink pr-4">
                    <div class="rounded-full p-5 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                </div>
                <div class="flex-1 text-right md:text-center">
                    <h2 class="font-bold uppercase text-gray-600">Number of conversations</h2>
                    <p class="font-bold text-3xl text-black flex items-center justify-end md:justify-center">
                        {{ nbConversations ?? 'Loading...' }}
                    </p>
                </div>
            </div>
        </div>
        <!--/Metric Card-->
    </div>
    <div class="w-full md:w-1/2 xl:w-1/3 p-6">
        <!--Metric Card-->
        <div class="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
            <div class="flex flex-row items-center">
                <div class="flex-shrink pr-4">
                    <div class="rounded-full p-5 bg-pink-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
                </div>
                <div class="flex-1 text-right md:text-center">
                    <h2 class="font-bold uppercase text-gray-600">Total Users</h2>
                    <p class="font-bold text-3xl text-black">{{ nbTotalUsers ?? 'Loading...' }} </p>
                </div>
            </div>
        </div>
        <!--/Metric Card-->
    </div>
    <div class="w-full md:w-1/2 xl:w-1/3 p-6">
        <!--Metric Card-->
        <div class="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
            <div class="flex flex-row items-center">
                <div class="flex-shrink pr-4">
                    <div class="rounded-full p-5 bg-yellow-600"><i class="fas fa-user-plus fa-2x fa-inverse"></i></div>
                </div>
                <div class="flex-1 text-right md:text-center">
                    <h2 class="font-bold uppercase text-gray-600">New Users</h2>
                    <p class="font-bold text-3xl text-black">{{ nbNewUsers ?? 'Loading...' }}</p>
                </div>
            </div>
        </div>
        <!--/Metric Card-->
    </div>

</div>

</div>
</template>
<script>
export default {
    data() {
        return {
            nbConversations: 0,
            nbTotalUsers: 0,
            nbNewUsers: 0
        };
    },
    mounted() {
        const url = "http://localhost:3000" ; 

        fetch(url+"/getKpis",{
            mode:"get" ,
            mode : "cors", 
            headers : {
                "Content-Type" : "Application/json"
            }, 
            credentials : "include"
        }).then( async (response) => {
            if (response.status == 200) {
                const data = await response.json() ; 
                this.nbConversations = data.nbConversations ; 
                this.nbTotalUsers = data.nbTotalUsers ; 
                this.nbNewUsers = data.nbNewUsers ; 
            }
        })
    }
}
</script>