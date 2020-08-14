import { Router, NavigationFailure, RouteLocationOptions } from 'vue-router'
import { RoutiderOptions, RouteNames } from './options'
import { RouteQueryAndHash } from './vue-router-utils'
import { ExtractParams } from './path'
import { RoutiderRouteRecord } from './route'
import { RouteRecordName } from './name'

type ParamsOfRouteName<Route extends RoutiderRouteRecord> = ExtractParams<
  Route['path']
>

type RoutiderRouteLocation<
  Routes extends RoutiderOptions['routes'],
  N extends keyof Routes
> = RouteQueryAndHash &
  (ParamsOfRouteName<Routes[N]> extends never
    ? void
    : {
        params: Record<ParamsOfRouteName<Routes[N]>, string>
      }) &
  RouteLocationOptions

export interface RoutiderRouter<O extends RoutiderOptions>
  extends Omit<Router, 'push' | 'replace'> {
  push<N extends RouteNames<O>>(
    name: N,
    options: RoutiderRouteLocation<O['routes'], N>
  ): Promise<NavigationFailure | void | undefined>
  replace<N extends RouteNames<O>>(
    name: N,
    options: RoutiderRouteLocation<O['routes'], N>
  ): Promise<NavigationFailure | void | undefined>
}

export const createRoutiderRouter = <O extends RoutiderOptions>(
  router: Router
): RoutiderRouter<O> => {
  const push = <N extends RouteNames<O>>(
    name: N,
    options: RoutiderRouteLocation<O['routes'], N>
  ) => router.push({ name: name as RouteRecordName, ...options })

  const replace = <N extends RouteNames<O>>(
    name: N,
    options: RoutiderRouteLocation<O['routes'], N>
  ) => router.replace({ name: name as RouteRecordName, ...options })

  return {
    ...router,
    push,
    replace
  }
}
