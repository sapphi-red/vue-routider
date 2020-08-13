import { Router, createRouter, useRoute as useRouteVueRouter } from 'vue-router'
import { RoutiderLocation, RoutiderLocationOfName } from './location'
import {
  RoutiderOptions,
  RouteNames,
  routiderOptionsToRouterOptions
} from './options'

interface Routider<O extends RoutiderOptions> {
  router: Router
  useRouter: () => Router
  useRoute: <N extends RouteNames<O> | null>(
    name: N
  ) => N extends null
    ? RoutiderLocation<string>
    : RoutiderLocationOfName<O, Exclude<N, null>>
}

export const createRoutider = <O extends RoutiderOptions>(
  options: O
): Routider<O> => {
  const routerOptions = routiderOptionsToRouterOptions(options)
  const router = createRouter(routerOptions)

  const useRouter = () => router

  const useRoute = <N extends keyof O['routes'] | null>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _name: N
  ) =>
    useRouteVueRouter() as N extends null
      ? RoutiderLocation<string>
      : RoutiderLocationOfName<O, Exclude<N, null>>

  return { router, useRouter, useRoute }
}
