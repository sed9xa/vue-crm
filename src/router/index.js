import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  /* {
    path: '/',
    name: 'home',
    component: () =>{import('../views/home')}
  }, */
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'empty'
    },
    component: () =>import('../views/login')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/categories')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
