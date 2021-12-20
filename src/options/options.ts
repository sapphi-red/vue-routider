import { RouterOptions, RouteRecordRaw } from 'vue-router'
import { RouteRecordName } from './name'
import {
  RoutiderRouteRecord,
  pathToPathAndAlias,
  ExtractChildren
} from '../route/route'
import { UnionToIntersection } from '../type'
import { Path, pathsToString, pathToString, ExtractParams } from './path'
import warning from 'tiny-warning'
import { ExtractQueries } from './queries'
import { isDev } from '../util'

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
  [K in keyof Children]: RoutiderRouteRecord<
    ExtractParams<ParentPath> | ExtractParams<Children[K]['path']>,
    ExtractQueries<Children[K]>,
    ExtractChildren<Children[K]>
  >
}

type ExtractChildrenWithParentParams<T extends RoutiderRouteRecord> =
  ExtractChildren<T> extends RoutiderRoutes
    ? AddParentParams<T['path'], ExtractChildren<T>>
    : never

export type FlatRoutes<T extends RoutiderRoutes> = T &
  UnionToIntersection<
    {
      [K in keyof T]: FlatRoutes<ExtractChildrenWithParentParams<T[K]>>
    }[keyof T]
  >

export const warnIfNonTopLevelAbsolutePath = (path: Path): void => {
  const warnText = 'Absolute paths cannot be used with Vue Routider.'
  if (Array.isArray(path)) {
    warning(
      !pathsToString(path).some(p => p.startsWith('/')),
      `${warnText} (${path.join(', ')})`
    )
  } else {
    warning(!pathToString(path).startsWith('/'), `${warnText} (${path})`)
  }
}

export const routiderRoutesToRouteRecords = (
  routes: RoutiderRoutes,
  isTopLevel = true
): RouteRecordRaw[] =>
  Object.entries(routes).map(([name, route]) => {
    if (isDev && !isTopLevel) {
      warnIfNonTopLevelAbsolutePath(route.path)
    }

    return {
      ...route,
      name,
      ...pathToPathAndAlias(route.path),
      children: route.children
        ? routiderRoutesToRouteRecords(route.children, false)
        : undefined
    } as RouteRecordRaw
  })

export const routiderOptionsToRouterOptions = (
  options: RoutiderOptions
): RouterOptions => ({
  ...options,
  routes: routiderRoutesToRouteRecords(options.routes)
})
