import { createMemoryHistory, createRouter } from 'vue-router'
import Home from "@/components/Home.vue" 
import Login from "@/components/Login.vue" 
import Register from '@/components/Register.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router ;