import { RouteLocationNormalizedLoaded } from 'vue-router'
import { RoutiderOptions, RouteNames } from './options'
import { ExtractParams } from './path'

/**
 * Typed `RouteLocationNormalizedLoaded`
 */
export interface RoutiderLocation<ParamNames extends string | undefined>
  extends RouteLocationNormalizedLoaded {
  params: Record<Exclude<ParamNames, undefined>, string>
}

type RouteOfName<
  O extends RoutiderOptions,
  N extends RouteNames<O>
> = O['routes'][N]

/**
 * Get Typed `RouteLocationNormalizedLoaded` from Route
 */
export type RoutiderLocationOfName<
  O extends RoutiderOptions,
  N extends RouteNames<O>
> = RoutiderLocation<ExtractParams<RouteOfName<O, N>['path']>>
