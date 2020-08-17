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
  ExtractParams
} from '../options/path'
import { RoutiderLocation, RoutiderLocationN } from './location'
import { RoutiderNavigationGuardNext } from '../router/navigationGuard'

/**
 * Typed _RouteRecordProps
 */
export type _RouteRecordProps<Params extends string | undefined> =
  | boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((to: RoutiderLocation<Params, undefined>) => Record<string, any>)

type RoutiderRouteRecordRedirectOption<Params extends string | undefined> = (
  to: RoutiderLocation<Params, undefined>
) => unknown

/**
 * Typed `NavigationGuardWithThis` for beforeEnter
 */
export interface RoutiderBeforeEnterGuardWithThis<
  T,
  Params extends string | undefined
> {
  (
    this: T,
    to: RoutiderLocationN<Params, undefined>,
    from: RoutiderLocationN<undefined, undefined>,
    next: RoutiderNavigationGuardNext<Record<never, never>>
  ): NavigationGuardReturn | Promise<NavigationGuardReturn>
}

/**
 * Typed RouteRecordBase
 */
export interface _RoutiderRouteRecordBase<T extends string | undefined>
  extends Omit<_RouteRecordBase, 'path' | 'beforeEnter'> {
  /**
   * `name` will be automatically set from key
   */
  name?: never
  /**
   * Path of the record. Should start with / unless the record is the child of another record.
   * @example createPath`/users/${'id'}` matches `/users/1` as well as `/users/posva`. '/users' matches only `/users`.
   */
  path: RoutiderPath<T> | string | RoutiderPaths<T> | string[]
  /**
   * Use `path` with an array for aliases.
   */
  alias?: never
  /**
   * Nested routes are not supported by vue-routider because of type inference limitations.
   * @see {@link https://github.com/sapphi-red/vue-routider/issues/4}
   */
  children?: never
  redirect?: RoutiderRouteRecordRedirectOption<T>
  beforeEnter?:
    | RoutiderBeforeEnterGuardWithThis<undefined, T>
    | RoutiderBeforeEnterGuardWithThis<undefined, T>[]
}

interface RoutiderRouteRecordSingleView<T extends string | undefined>
  extends _RoutiderRouteRecordBase<T> {
  /**
   * Component to display when the URL matches this route.
   */
  component: RawRouteComponent
  /**
   * Allow passing down params as props to the component rendered by `router-view`.
   */
  props?: _RouteRecordProps<T>
}
interface RoutiderRouteRecordMultipleViews<T extends string | undefined>
  extends _RoutiderRouteRecordBase<T> {
  /**
   * Components to display when the URL matches this route. Allow using named views.
   */
  components: Record<string, RawRouteComponent>
  /**
   * Allow passing down params as props to the component rendered by
   * `router-view`. Should be an object with the same keys as `components` or a
   * boolean to be applied to every component.
   */
  props?: Record<string, _RouteRecordProps<T>> | boolean
}
interface RoutiderRouteRecordRedirect<T extends string | undefined>
  extends _RoutiderRouteRecordBase<T> {
  redirect: RoutiderRouteRecordRedirectOption<T>
  component?: never
  components?: never
  children?: never
}

export declare type RoutiderRouteRecord<
  T extends string | undefined = string | undefined
> =
  | RoutiderRouteRecordSingleView<T>
  | RoutiderRouteRecordMultipleViews<T>
  | RoutiderRouteRecordRedirect<T>

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
> = string extends ExtractParams<Route['path']>
  ? RoutiderRouteRecord<undefined>
  : Route

export const createRoute = <T extends string | undefined>(
  route: RoutiderRouteRecord<T>
): ConvertToUndefinedIfStringPath<RoutiderRouteRecord<T>> =>
  route as ConvertToUndefinedIfStringPath<RoutiderRouteRecord<T>>
