import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  { path: '/', name: 'HomePage', component: () => import('@/views/HomePage.vue') },
  { path: '/signup', name: 'SignupPage', component: () => import('@/views/SignupPage.vue') },
  { path: '/privacy-policy', name: 'PrivacyPolicy', component: () => import('@/views/PrivacyPolicy.vue') },
  { path: '/terms', name: 'TermsOfService', component: () => import('@/views/TermsOfService.vue') },
  { path: '/profile', name: 'ProfilePage', component: () => import('@/views/ProfilePage.vue'), meta: { requiresAuth: true } },
  { path: '/login', name: 'LoginPage', component: () => import('@/views/LoginPage.vue') },
  { path: '/password', name: 'PasswordPage', component: () => import('@/views/PasswordPage.vue') },
  { path: '/reset-password', name: 'ResetPassword', component: () => import('@/views/ResetPassword.vue') },
  { path: '/recipe', name: 'RecipePage', component: () => import('@/views/RecipePage.vue'), meta: { requiresAuth: true } },
  { path: '/recipes', name: 'AllRecipesPage', component: () => import('@/views/AllRecipesPage.vue'), meta: { requiresAuth: true } },
  { path: '/analyse', name: 'AnalysePage', component: () => import('@/views/AnalysePage.vue'), meta: { requiresAuth: true } },
  { path: '/grocery', name: 'GroceryList', component: () => import('@/views/GroceryList.vue'), meta: { requiresAuth: true } },
  { path: '/my-recipes', name: 'MyRecipesPage', component: () => import('@/views/MyRecipesPage.vue'), meta: { requiresAuth: true } },
  { path: '/ingredients', name: 'IngredientsPage', component: () => import('@/views/IngredientsPage.vue'), meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    await store.dispatch('checkAuthentication')
    const isAuthenticated = store.getters.isAuthenticated
    if (!isAuthenticated) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
