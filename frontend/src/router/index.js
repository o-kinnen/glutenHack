import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'HomePage', component: () => import('@/views/HomePage.vue') },
  { path: '/inscription', name: 'SignupPage', component: () => import('@/views/SignupPage.vue') },
  { path: '/conditions', name: 'TermsOfService', component: () => import('@/views/TermsOfService.vue') }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router