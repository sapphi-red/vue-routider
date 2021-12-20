import { RoutiderRouteRecord } from '../route/route'
import { LocationQuery } from 'vue-router'
import { IfNotString } from '../type'
import { isDev } from '../util'

export const createQueries = <T extends string>(
  ...queries: [T, ...T[]]
): Array<IfNotString<T>> => {
  if (isDev) {
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

  return (queries as unknown) as Array<IfNotString<T>>
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
