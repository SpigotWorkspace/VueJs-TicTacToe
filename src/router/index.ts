import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Board from '@/components/Board.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: HomeView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/board',
      name: 'board',
      component: Board
    }
  ]
})

export default router
