import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '萌夢島 - 首頁',
    },
  },
  {
    path: '/cursor-test',
    name: 'cursor-test',
    component: () => import('@/views/cursor-test.vue'),
    meta: {
      title: '鼠标跟随特效测试',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Mengdao Game View`
  next()
})

export default router
