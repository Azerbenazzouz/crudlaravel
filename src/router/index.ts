import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import UsersView from '@/views/UsersView.vue'
import ProductsView from '../views/ProductsView.vue'
import { useAuthStore } from '@/stores/useAuth'
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
      component: RegisterView,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      children: [
        {
          path: 'users',
          name: 'Users',
          component: UsersView
        },
        {
          path: 'products',
          name: 'Products',
         component: ProductsView
       },
       {
         path: 'historique',
         name: 'Historique',
         component: () => import('../views/HistoriqueView.vue')
       },
       {
         path: 'add-product',
        name: 'AddProduct',
        component: () => import('../views/AddProductView.vue')
      },
      {
        path: 'generate-post',
        name: 'GeneratePost',
        component: () => import('../views/GeneratePostView.vue')
      },
      {
        path: 'generate-description',
        name: 'GenerateDescription',
        component: () => import('../views/GenerateDescriptionView.vue')
      },
      {
        path: 'generate-seo',
        name: 'GenerateSEO',
        component: () => import('../views/GenerateSEOView.vue')
      }
    ]
  }
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if(auth.isAuthenticated){
    if(to.name === 'Login' || to.name === 'Register'){
      return { name: 'home' } // Redirect to home if authenticated
    }
  } else {
    const publicRoutes = ['Login', 'Register', 'home']
    if(!publicRoutes.includes(to.name as string)){
      return { name: 'Login' }
    }
  }

  return true
})




export default router
