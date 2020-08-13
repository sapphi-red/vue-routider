import { Router, createRouter, useRoute as useRouteVueRouter } from 'vue-router'
import { RoutiderLocationOfName } from './location'
import {
  RoutiderOptions,
  RouteNames,
  routiderOptionsToRouterOptions
} from './options'

interface Routider<O extends RoutiderOptions> {
  router: Router
  useRouter: () => Router
  useRoute: <N extends RouteNames<O>>(name: N) => RoutiderLocationOfName<O, N>
}

export const createRoutider = <O extends RoutiderOptions>(
  options: O
): Routider<O> => {
  const routerOptions = routiderOptionsToRouterOptions(options)
  const router = createRouter(routerOptions)

  const useRouter = () => router

  const useRoute = <N extends keyof O['routes']>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _name: N
  ): RoutiderLocationOfName<O, N> =>
    useRouteVueRouter() as RoutiderLocationOfName<O, N>

  return { router, useRouter, useRoute }
}
