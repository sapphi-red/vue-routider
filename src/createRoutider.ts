import { Router, createRouter, useRoute as useRouteVueRouter } from 'vue-router'
import { RoutiderLocation, RoutiderLocationOfNames } from './route/location'
import {
  RoutiderOptions,
  RouteNames,
  routiderOptionsToRouterOptions
} from './options/options'
import { RoutiderRouter, createRoutiderRouter } from './router/router'
import { warnIfIncorrectRoute } from './route/checkRoute'

interface Routider<O extends RoutiderOptions> {
  router: Router
  useRouter: () => RoutiderRouter<O>
  useRoute: <
    N extends RouteNames<O['routes']> | RouteNames<O['routes']>[] | null
  >(
    name: N
  ) => N extends null
    ? RoutiderLocation<undefined, string>
    : RoutiderLocationOfNames<O['routes'], Exclude<N, null>>
}

export const createRoutider = <O extends RoutiderOptions>(
  options: O
): Routider<O> => {
  const routerOptions = routiderOptionsToRouterOptions(options)
  const router = createRouter(routerOptions)

  const useRouter = () => createRoutiderRouter<O>(router)

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

  return { router, useRouter, useRoute }
}
