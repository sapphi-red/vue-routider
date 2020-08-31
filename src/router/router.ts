import { Router, NavigationFailure, RouteLocationOptions } from 'vue-router'
import {
  RoutiderOptions,
  RouteNames,
  RoutiderRoutes,
  FlatRoutes
} from '../options/options'
import { RouteQueryAndHash } from '../vue-router-utils'
import { ExtractParams } from '../options/path'
import { RoutiderRouteRecord } from '../route/route'
import {
  RoutiderNavigationGuardWithThis,
  RoutiderPostNavigationGuard
} from './navigationGuard'
import { RoutiderLocation, RoutiderLocationOfNames } from '../route/location'

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
  Routes extends RoutiderRoutes,
  N extends keyof Routes
> = RouteQueryAndHash & { name: N } & ParamsObjOfRouteName<Routes[N]> &
  RouteLocationOptions

export interface RoutiderRouter<O extends RoutiderOptions> extends Router {
  addRoute: never
  removeRoute: never

  push<N extends RouteNames<FlatRoutes<O['routes']>>>(
    to: RoutiderRouteLocation<FlatRoutes<O['routes']>, N>
  ): Promise<NavigationFailure | void | undefined>
  replace<N extends RouteNames<FlatRoutes<O['routes']>>>(
    to: RoutiderRouteLocation<FlatRoutes<O['routes']>, N>
  ): Promise<NavigationFailure | void | undefined>

  beforeEach(
    guard: RoutiderNavigationGuardWithThis<undefined, FlatRoutes<O['routes']>>
  ): () => void
  beforeResolve(
    guard: RoutiderNavigationGuardWithThis<undefined, FlatRoutes<O['routes']>>
  ): () => void
  afterEach(
    guard: RoutiderPostNavigationGuard<FlatRoutes<O['routes']>>
  ): () => void

  isRouteName<N extends RouteNames<FlatRoutes<O['routes']>>>(
    location: RoutiderLocation<
      undefined,
      undefined,
      undefined,
      RouteNames<FlatRoutes<O['routes']>>
    >,
    name: N
  ): location is RoutiderLocationOfNames<
    FlatRoutes<O['routes']>,
    Exclude<N, null>
  >
  getOptionalTypedRoute(
    location: RoutiderLocation<
      undefined,
      undefined,
      undefined,
      RouteNames<FlatRoutes<O['routes']>>
    >
  ): RoutiderLocationOfNames<
    FlatRoutes<O['routes']>,
    RouteNames<FlatRoutes<O['routes']>>
  >
}

export const createRoutiderRouter = <O extends RoutiderOptions>(
  router: Router
): RoutiderRouter<O> => {
  const isRouteName = <N extends RouteNames<FlatRoutes<O['routes']>>>(
    location: RoutiderLocation<
      undefined,
      undefined,
      undefined,
      RouteNames<FlatRoutes<O['routes']>>
    >,
    name: N
  ): location is RoutiderLocationOfNames<
    FlatRoutes<O['routes']>,
    Exclude<N, null>
  > => name === location.name
  const getOptionalTypedRoute = (
    location: RoutiderLocation<
      undefined,
      undefined,
      undefined,
      RouteNames<FlatRoutes<O['routes']>>
    >
  ) =>
    location as RoutiderLocationOfNames<
      FlatRoutes<O['routes']>,
      RouteNames<FlatRoutes<O['routes']>>
    >

  return { ...router, isRouteName, getOptionalTypedRoute } as RoutiderRouter<O>
}
