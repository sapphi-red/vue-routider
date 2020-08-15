import { RouterOptions, RouteRecordRaw } from 'vue-router'
import { RouteRecordName } from './name'
import { RoutiderRouteRecord, pathToPathAndAlias } from '../route/route'

export type RoutiderRoutes = Record<RouteRecordName, RoutiderRouteRecord>

export interface RoutiderOptions extends Omit<RouterOptions, 'routes'> {
  routes: RoutiderRoutes
}

export type RouteNames<Routes extends RoutiderRoutes> = keyof Routes

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
