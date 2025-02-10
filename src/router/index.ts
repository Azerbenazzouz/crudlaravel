import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'Register',
      component: LoginView,
    },
  ],
})

router.beforeEach((to) => {
  if (localStorage.getItem("token") && (to.name === 'Login' || to.name === 'Register')) {
    return { name: 'home' } // Redirect to home if authenticated
  }
  return true
})


export default router
