import { createRoutider } from 'vue-routider'
import { createWebHistory } from 'vue-router'
import { VueComponent as Index } from '/@/pages/Index.md'
import Hello from '/@/pages/Hello.vue'
import { VueComponent as Example } from '/@/pages/example.md'
import { VueComponent as Limitations } from '/@/pages/Limitations.md'

const history = createWebHistory()

const routes = {
  Index: {
    path: '/',
    component: Index
  },
  Hello: {
    path: '/hello',
    component: Hello
  },
  Example: {
    path: '/example',
    component: Example
  },
  Limitations: {
    path: '/limitations',
    component: Limitations
  }
}

export type Routes = typeof routes

const { router, useRoute, useRouter } = createRoutider({
  history,
  routes
})

export default router
export { useRoute, useRouter }
