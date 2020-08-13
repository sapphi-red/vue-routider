import {
  RouterOptions,
  Router,
  createRouter,
  RouteRecordRaw,
  useRoute as useRouteVueRouter
} from 'vue-router'
import { RouteRecordName } from './name'
import { RouteNames, RoutiderLocationOfName } from './location'
import { RoutiderRouteRecord, pathToPathAndAlias } from './route'

export type RoutiderOptionsRoutes = Record<
  RouteRecordName,
  RoutiderRouteRecord<string | undefined>
>

export interface RoutiderOptions extends Omit<RouterOptions, 'routes'> {
  routes: RoutiderOptionsRoutes
}

interface Routider<O extends RoutiderOptions> {
  router: Router
  useRouter: () => Router
  useRoute: <N extends RouteNames<O>>(name: N) => RoutiderLocationOfName<O, N>
}

export const createRoutider = <O extends RoutiderOptions>(
  options: O
): Routider<O> => {
  const routes = Object.entries(options.routes).map(
    ([name, route]): RouteRecordRaw => ({
      ...route,
      name,
      ...pathToPathAndAlias(route.path)
    })
  )

  const router = createRouter({ ...options, routes })

  const useRouter = (): Router => router

  const useRoute = <N extends keyof O['routes']>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _name: N
  ): RoutiderLocationOfName<O, N> =>
    useRouteVueRouter() as RoutiderLocationOfName<O, N>

  return { router, useRouter, useRoute }
}
