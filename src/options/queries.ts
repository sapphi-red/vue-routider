import { RoutiderRouteRecord } from '../route/route'
import { LocationQuery } from 'vue-router'
import { IfNotString } from '../type'

export const createQueries = <T extends string>(
  ...queries: [T, ...T[]]
): T[] => {
  if (__DEV__) {
    const qs = new Set<T>()
    for (const q of queries) {
      if (qs.has(q)) {
        console.warn(
          `vue-routider: duplicated query key was passed to createQueries. (${q})`
        )
      }
      qs.add(q)
    }
  }

  return queries
}

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
