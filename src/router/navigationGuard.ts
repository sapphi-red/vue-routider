import { NavigationFailure } from 'vue-router'
import {
  NavigationGuardReturn,
  NavigationGuardNextCallback
} from '../vue-router-utils'
import { RoutiderLocationNL } from '../route/location'
import { RoutiderRoutes, RouteNames } from '../options/options'
import { RoutiderRouteLocation } from './router'
import { ValidTypeLocation } from '../createRoutider'

/**
 * Typed `NavigationGuardNext`
 */
export interface RoutiderNavigationGuardNext<Routes extends RoutiderRoutes> {
  (): void
  (error: Error): void
  <N extends keyof Routes>(
    location: RoutiderRouteLocation<Routes, N> | ValidTypeLocation
  ): void
  (valid: boolean): void
  (cb: NavigationGuardNextCallback): void
}

/**
 * Typed `NavigationGuardWithThis`
 */
export interface RoutiderNavigationGuardWithThis<
  T,
  Routes extends RoutiderRoutes
> {
  (
    this: T,
    to: RoutiderLocationNL<undefined, undefined, undefined, RouteNames<Routes>>,
    from: RoutiderLocationNL<
      undefined,
      undefined,
      undefined,
      RouteNames<Routes>
    >,
    next: RoutiderNavigationGuardNext<Routes>
  ): NavigationGuardReturn | Promise<NavigationGuardReturn>
}

/**
 * Typed `PostNavigationGuard`
 */
export interface RoutiderPostNavigationGuard<Routes extends RoutiderRoutes> {
  (
    to: RoutiderLocationNL<undefined, undefined, undefined, RouteNames<Routes>>,
    from: RoutiderLocationNL<
      undefined,
      undefined,
      undefined,
      RouteNames<Routes>
    >,
    failure?: NavigationFailure | void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any
}

/**
 * Typed `NavigationGuard`
 */
export interface RoutiderNavigationGuard<Routes extends RoutiderRoutes> {
  (
    to: RoutiderLocationNL<undefined, undefined, undefined, RouteNames<Routes>>,
    from: RoutiderLocationNL<
      undefined,
      undefined,
      undefined,
      RouteNames<Routes>
    >,
    next: RoutiderNavigationGuardNext<Routes>
  ): NavigationGuardReturn | Promise<NavigationGuardReturn>
}
