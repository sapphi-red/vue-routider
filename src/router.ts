import { Router, NavigationFailure, RouteLocationOptions } from 'vue-router'
import { RoutiderOptions, RouteNames } from './options'
import { RouteQueryAndHash } from './vue-router-utils'
import { ExtractParams } from './path'
import { RoutiderRouteRecord } from './route'

type ParamsOfRouteName<Route extends RoutiderRouteRecord> = ExtractParams<
  Route['path']
>

type ParamsObjOfRouteName<
  Route extends RoutiderRouteRecord
> = ParamsOfRouteName<Route> extends never // eslint-disable-next-line @typescript-eslint/ban-types
  ? {}
  : {
      params: Record<ParamsOfRouteName<Route>, string>
    }

export type RoutiderRouteLocation<
  Routes extends RoutiderOptions['routes'],
  N extends keyof Routes
> = RouteQueryAndHash & { name: N } & ParamsObjOfRouteName<Routes[N]> &
  RouteLocationOptions

export interface RoutiderRouter<O extends RoutiderOptions>
  extends Omit<Router, 'push' | 'replace'> {
  push<N extends RouteNames<O>>(
    to: RoutiderRouteLocation<O['routes'], N>
  ): Promise<NavigationFailure | void | undefined>
  replace<N extends RouteNames<O>>(
    to: RoutiderRouteLocation<O['routes'], N>
  ): Promise<NavigationFailure | void | undefined>
}

export const createRoutiderRouter = <O extends RoutiderOptions>(
  router: Router
): RoutiderRouter<O> => {
  return router
}
