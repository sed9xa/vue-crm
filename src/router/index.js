import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'main'
    },
    component: () =>import('../views/home')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'empty'
    },
    component: () =>import('../views/login')
  },
  {
    path: '/registration',
    name: 'registration',
    meta: {
      layout: 'empty'
    },
    component: () => import('@/views/registration')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/categories')
  },
  {
    path: '/history',
    name: 'history',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/history')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/planning')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/profile')
  },
  {
    path: '/detail-record',
    name: 'detail-record',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/detail-record')
  },
  {
    path: '/record',
    name: 'record',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/record')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
