import { Router, createRouter, useRoute as useRouteVueRouter } from 'vue-router'
import { RoutiderLocation, RoutiderLocationOfNames } from './location'
import {
  RoutiderOptions,
  RouteNames,
  routiderOptionsToRouterOptions
} from './options'
import { RoutiderRouter, createRoutiderRouter } from './router'

interface Routider<O extends RoutiderOptions> {
  router: Router
  useRouter: () => RoutiderRouter<O>
  useRoute: <N extends RouteNames<O> | RouteNames<O>[] | null>(
    name: N
  ) => N extends null
    ? RoutiderLocation<undefined, string>
    : RoutiderLocationOfNames<O, Exclude<N, null>>
}

export const createRoutider = <O extends RoutiderOptions>(
  options: O
): Routider<O> => {
  const routerOptions = routiderOptionsToRouterOptions(options)
  const router = createRouter(routerOptions)

  const useRouter = () => createRoutiderRouter<O>(router)

  const useRoute = <N extends RouteNames<O> | RouteNames<O>[] | null>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _name: N
  ) =>
    useRouteVueRouter() as N extends null
      ? RoutiderLocation<undefined, string>
      : RoutiderLocationOfNames<O, Exclude<N, null>>

  return { router, useRouter, useRoute }
}
