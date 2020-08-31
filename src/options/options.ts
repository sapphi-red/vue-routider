import { RouterOptions, RouteRecordRaw } from 'vue-router'
import { RouteRecordName } from './name'
import { RoutiderRouteRecord, pathToPathAndAlias } from '../route/route'
import { UnionToIntersection } from '../type'
import { CobinePaths, Path, pathsToString, pathToString } from './path'

export type RoutiderRoutes = Record<RouteRecordName, RoutiderRouteRecord>

export interface RoutiderOptions extends Omit<RouterOptions, 'routes'> {
  routes: RoutiderRoutes
}

export type RouteNames<Routes extends RoutiderRoutes> = Routes extends Record<
  infer K,
  unknown
>
  ? K
  : never

type AddParentParams<
  ParentPath extends Path,
  Children extends RoutiderRoutes
> = {
  [K in keyof Children]: Omit<Children[K], 'path'> & {
    path: CobinePaths<ParentPath, Children[K]['path']>
  }
}

type ExtractChildren<T extends RoutiderRouteRecord> = T extends {
  children: infer S
}
  ? S extends RoutiderRoutes
    ? AddParentParams<T['path'], S>
    : never
  : never

export type FlatRoutes<T extends RoutiderRoutes> = T &
  UnionToIntersection<
    {
      [K in keyof T]: FlatRoutes<ExtractChildren<T[K]>>
    }[keyof T]
  >

export const routiderRoutesToRouteRecords = (
  routes: RoutiderRoutes
): RouteRecordRaw[] =>
  Object.entries(routes).map(
    ([name, route]) =>
      ({
        ...route,
        name,
        ...pathToPathAndAlias(route.path),
        children: route.children
          ? routiderRoutesToRouteRecords(route.children)
          : undefined
      } as RouteRecordRaw)
  )

export const routiderOptionsToRouterOptions = (
  options: RoutiderOptions
): RouterOptions => ({
  ...options,
  routes: routiderRoutesToRouteRecords(options.routes)
})
