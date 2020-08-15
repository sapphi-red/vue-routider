import { createRoutider } from 'vue-routider'
import { createWebHistory } from 'vue-router'
import Index from '/@/pages/Index.vue'
import Hello from '/@/pages/Hello.vue'

const history = createWebHistory()

const routes = {
  Index: {
    path: '/',
    component: Index
  },
  Hello: {
    path: '/hello',
    component: Hello
  }
}

export type Routes = typeof routes

const { router, useRoute, useRouter } = createRoutider({
  history,
  routes
})

export default router
export { useRoute, useRouter }
