import { RouteLocationNormalizedLoaded } from 'vue-router'
import { RoutiderOptions, RouteNames } from './options'
import { ExtractParams } from './path'
import { RouteRecordName } from './name'
import { RoutiderRouteRecord } from './route'
import { EntityOrArrayToUnion, UnionToIntersection } from './type'

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

type RoutesOfNames<O extends RoutiderOptions, Ns extends RouteNames<O>> = {
  [N in Ns]: RouteOfName<O, N>
}

type ParamsOfRoutes<
  Rs extends Record<RouteRecordName, RoutiderRouteRecord<string | undefined>>
> = ExtractParams<
  UnionToIntersection<
    {
      [K in keyof Rs]: Rs[K]['path']
    }[keyof Rs]
  >
>

/**
 * Get Typed `RouteLocationNormalizedLoaded` from Route
 */
export type RoutiderLocationOfNames<
  O extends RoutiderOptions,
  N extends RouteNames<O> | RouteNames<O>[]
> = RoutiderLocation<ParamsOfRoutes<RoutesOfNames<O, EntityOrArrayToUnion<N>>>>
