import { RoutiderRouteRecord } from '../route/route'
import { LocationQuery } from 'vue-router'
import { IfNotString } from '../type'

export const createQueries = <T extends string>(...queries: [T, ...T[]]): T[] =>
  queries

export type ExtractQueries<
  Route extends RoutiderRouteRecord
> = Route extends RoutiderRouteRecord<string | undefined, infer Qs>
  ? IfNotString<Exclude<Qs, undefined>>
  : never

type LocationQueryValue = LocationQuery[keyof LocationQuery]

export type QueryMap<Queries extends string> = Record<
  Queries,
  LocationQueryValue
>
