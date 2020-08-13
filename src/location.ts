import { RouteLocationNormalizedLoaded } from 'vue-router'
import { RoutiderOptions } from './router'
import { ExtractParams } from './path'

export type RouteNames<O extends RoutiderOptions> = keyof O['routes']

/**
 * Typed `RouteLocationNormalizedLoaded`
 */
export interface RoutiderLocation<ParamNames extends string>
  extends RouteLocationNormalizedLoaded {
  params: Record<ParamNames, string>
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
