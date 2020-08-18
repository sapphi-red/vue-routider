import { createRoutider } from 'vue-routider'
import { createWebHistory } from 'vue-router'
import { VueComponent as Index } from '/@/pages/Index.md'
import { VueComponent as RouteMatching } from '/@/pages/RouteMatching.md'
import { VueComponent as UseRoute } from '/@/pages/UseRoute.md'
import { VueComponent as Navigation } from '/@/pages/Navigation.md'
import { VueComponent as RedirectAndAlias } from '/@/pages/RedirectAndAlias.md'
import { VueComponent as NavigationGuards } from '/@/pages/NavigationGuards.md'
import { VueComponent as RouteTypeGuards } from '/@/pages/RouteTypeGuards.md'
import { VueComponent as Limitations } from '/@/pages/Limitations.md'

const history = createWebHistory()

export const routes = {
  Index: {
    path: '/',
    component: Index
  },
  RouteMatching: {
    path: '/route-matching',
    component: RouteMatching
  },
  UseRoute: {
    path: '/use-route',
    component: UseRoute
  },
  Navigation: {
    path: '/navigation',
    component: Navigation
  },
  RedirectAndAlias: {
    path: '/redirect-and-alias',
    component: RedirectAndAlias
  },
  NavigationGuards: {
    path: '/navigation-guards',
    component: NavigationGuards
  },
  RouteTypeGuards: {
    path: '/route-type-guards',
    component: RouteTypeGuards
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
