import {
  RouteLocationNormalizedLoaded,
  RouteLocationNormalized
} from 'vue-router'
import { RouteNames, RoutiderRoutes } from '../options/options'
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
      string | string[]
    >
  >
}

/**
 * Typed `RouteLocationNormalized`
 */
export type RoutiderLocationN<
  ParamNames extends string | undefined,
  OptionalParamNames extends string | undefined,
  RouteName extends RouteNames<RoutiderRoutes>
> = Omit<RouteLocationNormalized, 'params'> & {
  name: RouteName
} & Params<ParamNames, OptionalParamNames>

/**
 * Typed `RouteLocationNormalizedLoaded`
 */
export type RoutiderLocation<
  ParamNames extends string | undefined,
  OptionalParamNames extends string | undefined,
  RouteName extends RouteNames<RoutiderRoutes>
> = Omit<RouteLocationNormalizedLoaded, 'params'> & {
  name: RouteName
} & Params<ParamNames, OptionalParamNames>

type RoutesOfNames<
  Routes extends RoutiderRoutes,
  Ns extends RouteNames<Routes> | RouteNames<Routes>[]
> = {
  [N in EntityOrArrayToUnion<Ns>]: Routes[N]
}

type IntersectionParamsOfRoutes<
  Rs extends Record<RouteRecordName, RoutiderRouteRecord>
> = ExtractParams<
  UnionToIntersection<
    {
      [K in keyof Rs]: Exclude<Rs[K]['path'], string | string[]>
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
  Routes extends RoutiderRoutes,
  N extends RouteNames<Routes> | RouteNames<Routes>[]
> = RoutiderLocation<
  IntersectionParamsOfRoutes<RoutesOfNames<Routes, N>>,
  UnionParamsOfRoutes<RoutesOfNames<Routes, N>>,
  EntityOrArrayToUnion<N>
>
