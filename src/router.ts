import {
  RouterOptions,
  Router,
  createRouter,
  RouteRecordRaw,
  useRoute as useRouteVueRouter
} from 'vue-router'
import { RoutiderPath } from './path'
import { RouteRecordName } from './name'
import { RouteNames, RoutiderLocationOfName } from './location'

/**
 * Typed RouteRecord
 */
export type RoutiderRouteRecord<T extends string> = Omit<
  RouteRecordRaw,
  'name'
> & {
  path: RoutiderPath<T>
}

export interface RoutiderOptions extends Omit<RouterOptions, 'routes'> {
  routes: Record<RouteRecordName, RoutiderRouteRecord<string>>
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
    ([name, route]): RouteRecordRaw =>
      ({
        ...route,
        name
      } as RouteRecordRaw)
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
