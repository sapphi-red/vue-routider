import {
  Router,
  createRouter,
  useRoute as useRouteVueRouter,
  onBeforeRouteLeave as onBeforeRouteLeaveVueRouter,
  onBeforeRouteUpdate as onBeforeRouteUpdateVueRouter
} from 'vue-router'
import { RoutiderLocation, RoutiderLocationOfNames } from './route/location'
import {
  RoutiderOptions,
  RouteNames,
  routiderOptionsToRouterOptions
} from './options/options'
import {
  RoutiderRouter,
  createRoutiderRouter,
  RoutiderRouteLocation
} from './router/router'
import { warnIfIncorrectRoute } from './route/checkRoute'
import { RoutiderNavigationGuard } from './router/navigationGuard'

declare const validTypeLocation: unique symbol
export type ValidTypeLocation = typeof validTypeLocation

interface Routider<O extends RoutiderOptions> {
  rawRouter: Router
  router: RoutiderRouter<O>
  useRouter: () => RoutiderRouter<O>
  useRoute: <
    N extends RouteNames<O['routes']> | RouteNames<O['routes']>[] | null
  >(
    name: N
  ) => N extends null
    ? RoutiderLocation<undefined, string>
    : RoutiderLocationOfNames<O['routes'], Exclude<N, null>>
  onBeforeRouteLeave: (leaveGuard: RoutiderNavigationGuard<O['routes']>) => void
  onBeforeRouteUpdate: (
    updateGuard: RoutiderNavigationGuard<O['routes']>
  ) => void

  ensureLocationType<N extends RouteNames<O['routes']>>(
    location: RoutiderRouteLocation<O['routes'], N>
  ): RoutiderRouteLocation<O['routes'], N> & ValidTypeLocation
}

export const createRoutider = <O extends RoutiderOptions>(
  options: O
): Routider<O> => {
  const routerOptions = routiderOptionsToRouterOptions(options)
  const rawRouter = createRouter(routerOptions)
  const router = createRoutiderRouter<O>(rawRouter)

  const useRouter = () => router

  const useRoute = <
    N extends RouteNames<O['routes']> | RouteNames<O['routes']>[] | null
  >(
    name: N
  ) => {
    const route = useRouteVueRouter()
    if (__DEV__) {
      warnIfIncorrectRoute<O['routes']>(route, name)
    }
    return route as N extends null
      ? RoutiderLocation<undefined, string>
      : RoutiderLocationOfNames<O['routes'], Exclude<N, null>>
  }

  const onBeforeRouteLeave = (
    leaveGuard: RoutiderNavigationGuard<O['routes']>
  ) => {
    onBeforeRouteLeaveVueRouter(leaveGuard)
  }
  const onBeforeRouteUpdate = (
    updateGuard: RoutiderNavigationGuard<O['routes']>
  ) => {
    onBeforeRouteUpdateVueRouter(updateGuard)
  }

  const ensureLocationType = <N extends RouteNames<O['routes']>>(
    location: RoutiderRouteLocation<O['routes'], N>
  ) => location as RoutiderRouteLocation<O['routes'], N> & ValidTypeLocation

  return {
    rawRouter,
    router,
    useRouter,
    useRoute,
    onBeforeRouteLeave,
    onBeforeRouteUpdate,
    ensureLocationType
  }
}
