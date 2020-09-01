import {
  Router,
  createRouter,
  useRoute as useRouteVueRouter,
  onBeforeRouteLeave as onBeforeRouteLeaveVueRouter,
  onBeforeRouteUpdate as onBeforeRouteUpdateVueRouter,
  NavigationGuard
} from 'vue-router'
import { RoutiderLocation, RoutiderLocationOfNames } from './route/location'
import {
  RoutiderOptions,
  RouteNames,
  routiderOptionsToRouterOptions,
  FlatRoutes
} from './options/options'
import {
  RoutiderRouter,
  createRoutiderRouter,
  RoutiderRouteLocation
} from './router/router'
import { warnIfIncorrectRoute } from './route/checkRoute'
import { RoutiderNavigationGuard } from './router/navigationGuard'
import { RoutiderRouteRecordRedirectOption } from './route/route'

declare const validTypeLocation: unique symbol
export type ValidTypeLocation = typeof validTypeLocation

declare const validRedirectFunction: unique symbol
export type ValidRedirectFunction = typeof validRedirectFunction

export interface Routider<O extends RoutiderOptions> {
  rawRouter: Router
  router: RoutiderRouter<O>
  useRouter: () => RoutiderRouter<O>
  useRoute: <
    N extends
      | RouteNames<FlatRoutes<O['routes']>>
      | RouteNames<FlatRoutes<O['routes']>>[]
      | null
  >(
    name: N
  ) => N extends null
    ? RoutiderLocation<
        undefined,
        string,
        string,
        RouteNames<FlatRoutes<O['routes']>>
      >
    : RoutiderLocationOfNames<FlatRoutes<O['routes']>, Exclude<N, null>>
  onBeforeRouteLeave: (
    leaveGuard: RoutiderNavigationGuard<FlatRoutes<O['routes']>>
  ) => void
  onBeforeRouteUpdate: (
    updateGuard: RoutiderNavigationGuard<FlatRoutes<O['routes']>>
  ) => void

  ensureLocationType<N extends RouteNames<FlatRoutes<O['routes']>>>(
    location: RoutiderRouteLocation<FlatRoutes<O['routes']>, N>
  ): RoutiderRouteLocation<FlatRoutes<O['routes']>, N> & ValidTypeLocation

  createRedirect<N extends RouteNames<FlatRoutes<O['routes']>>>(
    name: N,
    redirectFunc: RoutiderRouteRecordRedirectOption<
      FlatRoutes<O['routes']>[N],
      N
    >
  ): unknown
}

export const createRoutider = <O extends RoutiderOptions>(
  options: O
): Routider<O> => {
  const routerOptions = routiderOptionsToRouterOptions(options)
  const rawRouter = createRouter(routerOptions)
  const router = createRoutiderRouter<O>(rawRouter)

  const useRouter = () => router

  const useRoute = <
    N extends
      | RouteNames<FlatRoutes<O['routes']>>
      | RouteNames<FlatRoutes<O['routes']>>[]
      | null
  >(
    name: N
  ) => {
    const route = useRouteVueRouter()
    if (__DEV__) {
      warnIfIncorrectRoute<FlatRoutes<O['routes']>>(route, name)
    }
    return route as N extends null
      ? RoutiderLocation<
          undefined,
          string,
          string,
          RouteNames<FlatRoutes<O['routes']>>
        >
      : RoutiderLocationOfNames<FlatRoutes<O['routes']>, Exclude<N, null>>
  }

  const onBeforeRouteLeave = (
    leaveGuard: RoutiderNavigationGuard<FlatRoutes<O['routes']>>
  ) => {
    onBeforeRouteLeaveVueRouter(leaveGuard as NavigationGuard)
  }
  const onBeforeRouteUpdate = (
    updateGuard: RoutiderNavigationGuard<FlatRoutes<O['routes']>>
  ) => {
    onBeforeRouteUpdateVueRouter(updateGuard as NavigationGuard)
  }

  const ensureLocationType = <N extends RouteNames<FlatRoutes<O['routes']>>>(
    location: RoutiderRouteLocation<FlatRoutes<O['routes']>, N>
  ) =>
    location as RoutiderRouteLocation<FlatRoutes<O['routes']>, N> &
      ValidTypeLocation

  const createRedirect = <N extends RouteNames<FlatRoutes<O['routes']>>>(
    _name: N,
    redirectFunc: RoutiderRouteRecordRedirectOption<
      FlatRoutes<O['routes']>[N],
      N
    >
  ) => redirectFunc as unknown

  return {
    rawRouter,
    router,
    useRouter,
    useRoute,
    onBeforeRouteLeave,
    onBeforeRouteUpdate,
    ensureLocationType,
    createRedirect
  }
}
