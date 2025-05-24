<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"/> <!--Replace with your tailwind.css once created-->
    <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet"> <!--Totally optional :) -->
    


<div id="main" class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">

<div class="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 pt-6">
    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 p-6 shadow-2xl text-2xl text-white border-t-4 border-blue-400">
        <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <i class="fas fa-chart-line text-2xl"></i>
            </div>
            <div>
                <h1 class="font-bold text-3xl tracking-tight">Analytics Dashboard</h1>
                <p class="text-blue-200 text-sm mt-1 opacity-90">Real-time insights and statistics</p>
            </div>
        </div>
    </div>
</div>

<div class="flex flex-wrap">
    <div class="w-full md:w-1/2 xl:w-1/3 p-6">
        <!--Metric Card-->
        <div class="bg-gradient-to-br from-green-400 to-emerald-500 border-b-4 border-green-600 rounded-2xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] group">
            <div class="flex flex-row items-center">
                <div class="flex-shrink pr-6">
                    <div class="rounded-2xl p-6 bg-green-600 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <i class="fa fa-comments fa-3x fa-inverse"></i>
                    </div>
                </div>
                <div class="flex-1 text-right md:text-center">
                    <h2 class="font-bold uppercase text-white text-sm tracking-wider mb-2">Conversations</h2>
                    <p class="font-bold text-4xl text-white flex items-center justify-end md:justify-center">
                        {{ nbConversations ?? 'Loading...' }}
                        <span class="text-lg ml-2 opacity-80">💬</span>
                    </p>
                </div>
            </div>
        </div>
        <!--/Metric Card-->
    </div>
    <div class="w-full md:w-1/2 xl:w-1/3 p-6">
        <!--Metric Card-->
        <div class="bg-gradient-to-br from-pink-400 to-rose-500 border-b-4 border-pink-600 rounded-2xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] group">
            <div class="flex flex-row items-center">
                <div class="flex-shrink pr-6">
                    <div class="rounded-2xl p-6 bg-pink-600 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <i class="fas fa-users fa-3x fa-inverse"></i>
                    </div>
                </div>
                <div class="flex-1 text-right md:text-center">
                    <h2 class="font-bold uppercase text-white text-sm tracking-wider mb-2">Total Users</h2>
                    <p class="font-bold text-4xl text-white flex items-center justify-end md:justify-center">
                        {{ nbTotalUsers ?? 'Loading...' }}
                        <span class="text-lg ml-2 opacity-80">👤</span>
                    </p>
                </div>
            </div>
        </div>
        <!--/Metric Card-->
    </div>
    <div class="w-full md:w-1/2 xl:w-1/3 p-6">
        <!--Metric Card-->
        <div class="bg-gradient-to-br from-yellow-400 to-amber-500 border-b-4 border-yellow-600 rounded-2xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] group">
            <div class="flex flex-row items-center">
                <div class="flex-shrink pr-6">
                    <div class="rounded-2xl p-6 bg-yellow-600 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <i class="fas fa-user-plus fa-3x fa-inverse"></i>
                    </div>
                </div>
                <div class="flex-1 text-right md:text-center">
                    <h2 class="font-bold uppercase text-white text-sm tracking-wider mb-2">New Users</h2>
                    <p class="font-bold text-4xl text-white flex items-center justify-end md:justify-center">
                        {{ nbNewUsers ?? 'Loading...' }}
                        <span class="text-lg ml-2 opacity-80">🆕</span>
                    </p>
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
        this.fetchData()
    },
    methods : {
        fetchData() {
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
}
</script>