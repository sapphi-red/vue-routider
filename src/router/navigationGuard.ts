import {
  NavigationGuardNext,
  PostNavigationGuard,
  NavigationFailure
} from 'vue-router'
import {
  NavigationGuardReturn,
  NavigationGuardNextCallback
} from '../vue-router-utils'
import { RoutiderLocation, RoutiderLocationOfNames } from '../route/location'
import { RoutiderOptionsRoutes } from '../options/options'
import { RoutiderRouteLocation } from './router'

interface RoutiderNavigationGuardNext<Routes extends RoutiderOptionsRoutes>
  extends NavigationGuardNext {
  (): void
  (error: Error): void
  <N extends keyof Routes>(location: RoutiderRouteLocation<Routes, N>): void
  (valid: boolean): void
  (cb: NavigationGuardNextCallback): void
}

export interface RoutiderNavigationGuardWithThis<
  T,
  Routes extends RoutiderOptionsRoutes
> {
  (
    this: T,
    to: RoutiderLocationOfNames<Routes, keyof Routes>,
    from: RoutiderLocationOfNames<Routes, keyof Routes>,
    next: RoutiderNavigationGuardNext<Routes>
  ): NavigationGuardReturn | Promise<NavigationGuardReturn>
}

export interface RoutiderPostNavigationGuard<
  Routes extends RoutiderOptionsRoutes
> extends PostNavigationGuard {
  (
    to: RoutiderLocationOfNames<Routes, keyof Routes>,
    from: RoutiderLocationOfNames<Routes, keyof Routes>,
    failure?: NavigationFailure | void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any
}
