import { RouteLocationNormalizedLoaded } from 'vue-router'
import { RoutiderOptions, RouteNames } from '../options/options'
import { ExtractParams } from '../options/path'
import { RouteRecordName } from '../options/name'
import { RoutiderRouteRecord } from './route'
import { EntityOrArrayToUnion, UnionToIntersection } from '../type'

type RecordWithOptional<
  KRequired extends string | number | symbol,
  KOptional extends string | number | symbol,
  V
> = Record<KRequired, V> & Partial<Record<KOptional, V>>

export interface Params<
  ParamNames extends string | undefined,
  OptionalParamNames extends string | undefined
> {
  params: Readonly<
    RecordWithOptional<
      Exclude<ParamNames, undefined>,
      Exclude<OptionalParamNames, undefined>,
      string
    >
  >
}

/**
 * Typed `RouteLocationNormalizedLoaded`
 */
export type RoutiderLocation<
  ParamNames extends string | undefined,
  OptionalParamNames extends string | undefined
> = Omit<RouteLocationNormalizedLoaded, 'params'> &
  Params<ParamNames, OptionalParamNames>

type RouteOfName<
  O extends RoutiderOptions,
  N extends RouteNames<O>
> = O['routes'][N]

type RoutesOfNames<O extends RoutiderOptions, Ns extends RouteNames<O>> = {
  [N in Ns]: RouteOfName<O, N>
}

type IntersectionParamsOfRoutes<
  Rs extends Record<RouteRecordName, RoutiderRouteRecord>
> = ExtractParams<
  UnionToIntersection<
    {
      [K in keyof Rs]: Rs[K]['path']
    }[keyof Rs]
  >
>

type UnionParamsOfRoutes<
  Rs extends Record<RouteRecordName, RoutiderRouteRecord>
> = {
  [K in keyof Rs]: ExtractParams<Rs[K]['path']>
}[keyof Rs]

/**
 * Get Typed `RouteLocationNormalizedLoaded` from Route
 */
export type RoutiderLocationOfNames<
  O extends RoutiderOptions,
  N extends RouteNames<O> | RouteNames<O>[]
> = RoutiderLocation<
  IntersectionParamsOfRoutes<RoutesOfNames<O, EntityOrArrayToUnion<N>>>,
  UnionParamsOfRoutes<RoutesOfNames<O, EntityOrArrayToUnion<N>>>
>
