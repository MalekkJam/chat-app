import { createWebHistory, createRouter } from 'vue-router';  // Import createWebHistory
import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";
import Register from '@/components/Register.vue';
import Conversation from '@/components/Conversation.vue';
import Settings from '@/components/Settings.vue'

import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path : '/', component : Home , 
    children : [
      { path : '/conversation/:conversation', component : Conversation},
      { path : '/settings', component : Settings}
    ]
    },
];

const router = createRouter({
  history: createWebHistory(),  
  routes,
});

export default router;
