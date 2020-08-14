import { RouterOptions, RouteRecordRaw } from 'vue-router'
import { RouteRecordName } from './name'
import { RoutiderRouteRecord, pathToPathAndAlias } from './route'

export type RoutiderOptionsRoutes = Record<RouteRecordName, RoutiderRouteRecord>

export interface RoutiderOptions extends Omit<RouterOptions, 'routes'> {
  routes: RoutiderOptionsRoutes
}

export type RouteNames<O extends RoutiderOptions> = keyof O['routes']

export const routiderOptionsToRouterOptions = (
  options: RoutiderOptions
): RouterOptions => {
  const routes = Object.entries(options.routes).map(
    ([name, route]): RouteRecordRaw => ({
      ...route,
      name,
      ...pathToPathAndAlias(route.path)
    })
  )
  return { ...options, routes }
}
