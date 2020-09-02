// Code based on vue-router
// Copyright (c) 2020 Eduardo San Martin Morote
// Released under the MIT license
// https://github.com/vuejs/vue-router-next/blob/master/LICENSE

import { _RouteRecordBase } from 'vue-router'
import { RawRouteComponent, NavigationGuardReturn } from '../vue-router-utils'
import {
  RoutiderPath,
  RoutiderPaths,
  pathToString,
  pathsToString,
  Path
} from '../options/path'
import { RoutiderLocation, RoutiderLocationN } from './location'
import { RoutiderNavigationGuardNext } from '../router/navigationGuard'
import { RouteRecordName } from '../options/name'
import { RoutiderRoutes } from '../options/options'

/**
 * Typed _RouteRecordProps
 */
export type _RouteRecordProps<
  Params extends string | undefined,
  Queries extends string | undefined,
  RouteName extends RouteRecordName = RouteRecordName
> =
  | boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | Record<string, any>
  | ((
      to: RoutiderLocation<Params, undefined, Queries, RouteName>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Record<string, any>)

type RoutiderRouteRecordRedirectOption<
  Params extends string | undefined,
  Queries extends string | undefined,
  RouteName extends RouteRecordName = RouteRecordName
> = (to: RoutiderLocation<Params, undefined, Queries, RouteName>) => unknown

/**
 * Typed `NavigationGuardWithThis` for beforeEnter
 */
export interface RoutiderBeforeEnterGuardWithThis<
  T,
  Params extends string | undefined,
  Queries extends string | undefined,
  RouteName extends RouteRecordName = RouteRecordName
> {
  (
    this: T,
    to: RoutiderLocationN<Params, undefined, Queries, RouteName>,
    from: RoutiderLocationN<undefined, undefined, Queries, RouteName>,
    next: RoutiderNavigationGuardNext<Record<never, never>>
  ): NavigationGuardReturn | Promise<NavigationGuardReturn>
}

/**
 * Typed RouteRecordBase
 */
export interface _RoutiderRouteRecordBase<
  Params extends string | undefined,
  Queries extends string | undefined,
  Children extends RoutiderRoutes | undefined
>
  extends Omit<
    _RouteRecordBase,
    'path' | 'query' | 'children' | 'beforeEnter'
  > {
  /**
   * `name` will be automatically set from key
   */
  name?: never
  /**
   * Path of the record. Should start with / unless the record is the child of another record.
   * @example createPath`/users/${'id'}` matches `/users/1` as well as `/users/posva`. '/users' matches only `/users`.
   */
  path: Path<Params>
  /**
   * Use `path` with an array for aliases.
   */
  alias?: never
  /**
   * Define queries which may receive
   */
  query?: Queries[]
  children?: Children
  redirect?: RoutiderRouteRecordRedirectOption<Params, Queries>
  beforeEnter?:
    | RoutiderBeforeEnterGuardWithThis<undefined, Params, Queries>
    | RoutiderBeforeEnterGuardWithThis<undefined, Params, Queries>[]
}

interface RoutiderRouteRecordSingleView<
  Params extends string | undefined,
  Queries extends string | undefined,
  Children extends RoutiderRoutes | undefined
> extends _RoutiderRouteRecordBase<Params, Queries, Children> {
  /**
   * Component to display when the URL matches this route.
   */
  component: RawRouteComponent
  /**
   * Allow passing down params as props to the component rendered by `router-view`.
   */
  props?: _RouteRecordProps<Params, Queries>
}
interface RoutiderRouteRecordMultipleViews<
  Params extends string | undefined,
  Queries extends string | undefined,
  Children extends RoutiderRoutes | undefined
> extends _RoutiderRouteRecordBase<Params, Queries, Children> {
  /**
   * Components to display when the URL matches this route. Allow using named views.
   */
  components: Record<string, RawRouteComponent>
  /**
   * Allow passing down params as props to the component rendered by
   * `router-view`. Should be an object with the same keys as `components` or a
   * boolean to be applied to every component.
   */
  props?: Record<string, _RouteRecordProps<Params, Queries>> | boolean
}
interface RoutiderRouteRecordRedirect<
  Params extends string | undefined,
  Queries extends string | undefined,
  Children extends RoutiderRoutes | undefined
> extends _RoutiderRouteRecordBase<Params, Queries, Children> {
  redirect: RoutiderRouteRecordRedirectOption<Params, Queries>
  component?: never
  components?: never
  children?: never
}

export type RoutiderRouteRecord<
  Params extends string | undefined = string | undefined,
  Queries extends string | undefined = string | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Children extends RoutiderRoutes | undefined = any
> =
  | RoutiderRouteRecordSingleView<Params, Queries, Children>
  | RoutiderRouteRecordMultipleViews<Params, Queries, Children>
  | RoutiderRouteRecordRedirect<Params, Queries, Children>

export type ExtractChildren<
  T extends RoutiderRouteRecord
> = T extends RoutiderRouteRecord<
  string | undefined,
  string | undefined,
  infer C
>
  ? C
  : never

interface PathAndAlias {
  path: string
  alias?: string[]
}

export const pathToPathAndAlias = (
  path: RoutiderPath | string | RoutiderPaths | string[]
): PathAndAlias => {
  if (!Array.isArray(path)) return { path: pathToString(path) }

  if (path.length <= 0) {
    throw new Error(
      'Path property in Route of RoutiderOptions must have at least 1 path.'
    )
  }

  const pathStrings = pathsToString(path)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const pathProp = pathStrings.shift()!
  return { path: pathProp, alias: pathStrings }
}

type ConvertToUndefinedIfStringPath<
  Route extends RoutiderRouteRecord
> = Route extends RoutiderRouteRecord<infer P, infer Q>
  ? string extends P
    ? RoutiderRouteRecord<undefined, Q>
    : Route
  : never

type ConvertToUndefinedIfStringQuery<
  Route extends RoutiderRouteRecord
> = Route extends RoutiderRouteRecord<infer P, infer Q>
  ? string extends Q
    ? RoutiderRouteRecord<P, undefined>
    : Route
  : never

export const createRoute = <
  Params extends string | undefined,
  Queries extends string | undefined,
  Children extends RoutiderRoutes | undefined = undefined
>(
  route: RoutiderRouteRecord<Params, Queries, Children>
): ConvertToUndefinedIfStringQuery<
  ConvertToUndefinedIfStringPath<RoutiderRouteRecord<Params, Queries, Children>>
> =>
  route as ConvertToUndefinedIfStringQuery<
    ConvertToUndefinedIfStringPath<
      RoutiderRouteRecord<Params, Queries, Children>
    >
  >
