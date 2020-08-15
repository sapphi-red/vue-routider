import { NavigationFailure } from 'vue-router'
import {
  NavigationGuardReturn,
  NavigationGuardNextCallback
} from '../vue-router-utils'
import { RoutiderLocation } from '../route/location'
import { RoutiderOptionsRoutes } from '../options/options'
import { RoutiderRouteLocation } from './router'

/**
 * Typed `NavigationGuardNext`
 */
interface RoutiderNavigationGuardNext<Routes extends RoutiderOptionsRoutes> {
  (): void
  (error: Error): void
  <N extends keyof Routes>(location: RoutiderRouteLocation<Routes, N>): void
  (valid: boolean): void
  (cb: NavigationGuardNextCallback): void
}

/**
 * Typed `NavigationGuardWithThis`
 */
export interface RoutiderNavigationGuardWithThis<
  T,
  Routes extends RoutiderOptionsRoutes
> {
  (
    this: T,
    to: RoutiderLocation<undefined, undefined>,
    from: RoutiderLocation<undefined, undefined>,
    next: RoutiderNavigationGuardNext<Routes>
  ): NavigationGuardReturn | Promise<NavigationGuardReturn>
}

/**
 * Typed `PostNavigationGuard`
 */
export interface RoutiderPostNavigationGuard {
  (
    to: RoutiderLocation<undefined, undefined>,
    from: RoutiderLocation<undefined, undefined>,
    failure?: NavigationFailure | void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any
}

/**
 * Typed `NavigationGuard`
 */
export interface RoutiderNavigationGuard<Routes extends RoutiderOptionsRoutes> {
  (
    to: RoutiderLocation<undefined, undefined>,
    from: RoutiderLocation<undefined, undefined>,
    next: RoutiderNavigationGuardNext<Routes>
  ): NavigationGuardReturn | Promise<NavigationGuardReturn>
}
