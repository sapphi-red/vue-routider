import {
  RouteLocationNormalizedLoaded,
  RouteLocationNormalized,
  RouteLocation
} from 'vue-router'
import { RouteNames, RoutiderRoutes } from '../options/options'
import { ExtractParams } from '../options/path'
import { RouteRecordName } from '../options/name'
import { RoutiderRouteRecord } from './route'
import { EntityOrArrayToUnion, UnionToIntersection } from '../type'
import { ExtractQueries, QueryMap } from '../options/queries'

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

export interface Queries<Names extends string | undefined> {
  query: Readonly<QueryMap<Exclude<Names, undefined>>>
}

type RoutiderLocationBase<
  ParamNames extends string | undefined,
  OptionalParamNames extends string | undefined,
  QueryNames extends string | undefined,
  RouteName extends RouteNames<RoutiderRoutes>
> = Omit<RouteLocation, 'params' | 'query'> & {
  name: RouteName
} & Params<ParamNames, OptionalParamNames> &
  Queries<QueryNames>

/**
 * Typed `RouteLocation`
 */
export type RoutiderLocation<
  ParamNames extends string | undefined,
  OptionalParamNames extends string | undefined,
  QueryNames extends string | undefined,
  RouteName extends RouteNames<RoutiderRoutes>
> = RoutiderLocationBase<
  ParamNames,
  OptionalParamNames,
  QueryNames,
  RouteName
> &
  Pick<RouteLocation, 'matched'>

/**
 * Typed `RouteLocationNormalized`
 */
export type RoutiderLocationN<
  ParamNames extends string | undefined,
  OptionalParamNames extends string | undefined,
  QueryNames extends string | undefined,
  RouteName extends RouteNames<RoutiderRoutes>
> = RoutiderLocationBase<
  ParamNames,
  OptionalParamNames,
  QueryNames,
  RouteName
> &
  Pick<RouteLocationNormalized, 'matched'>

/**
 * Typed `RouteLocationNormalizedLoaded`
 */
export type RoutiderLocationNL<
  ParamNames extends string | undefined,
  OptionalParamNames extends string | undefined,
  QueryNames extends string | undefined,
  RouteName extends RouteNames<RoutiderRoutes>
> = RoutiderLocationBase<
  ParamNames,
  OptionalParamNames,
  QueryNames,
  RouteName
> &
  Pick<RouteLocationNormalizedLoaded, 'matched'>

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

type UnionQueriesOfRoutes<
  Rs extends Record<RouteRecordName, RoutiderRouteRecord>
> = {
  [K in keyof Rs]: ExtractQueries<Rs[K]>
}[keyof Rs]

/**
 * Get Typed `RouteLocationNormalizedLoaded` from Route
 */
export type RoutiderLocationOfNames<
  Routes extends RoutiderRoutes,
  N extends RouteNames<Routes> | RouteNames<Routes>[]
> = RoutiderLocationNL<
  IntersectionParamsOfRoutes<RoutesOfNames<Routes, N>>,
  UnionParamsOfRoutes<RoutesOfNames<Routes, N>>,
  UnionQueriesOfRoutes<RoutesOfNames<Routes, N>>,
  EntityOrArrayToUnion<N>
>
