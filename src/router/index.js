import { createRouter, createWebHistory } from 'vue-router'
import Auth from '@/views/auth.vue'
import Main from '@/views/main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    }
  ]
})

export default router
