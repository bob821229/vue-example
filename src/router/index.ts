import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/WaterJar',
      name: 'WaterJar',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WaterJar.vue')
    },
    {
      path: '/PersonnelInformationForm',
      name: 'PersonnelInformationForm',
      // route level code-splitting
      // this generates a separate chunk (PersonnelInformationForm.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PersonnelInformationForm.vue')
    },
    {
      path: '/BootstrapTable',
      name: 'BootstrapTable',
      // route level code-splitting
      // this generates a separate chunk (BootstrapTable.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BootstrapTable.vue')
    },
    {
      path: '/Echarts',
      name: 'Echarts',
      // route level code-splitting
      // this generates a separate chunk (Echarts.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Echarts.vue')
    }
  ]
})

export default router
