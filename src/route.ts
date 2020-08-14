// Code based on vue-router
// Copyright (c) 2020 Eduardo San Martin Morote
// Released under the MIT license
// https://github.com/vuejs/vue-router-next/blob/master/LICENSE

import { _RouteRecordBase } from 'vue-router'
import {
  RawRouteComponent,
  _RouteRecordProps,
  RouteRecordRedirectOption
} from './vue-router-utils'
import {
  RoutiderPath,
  RoutiderPaths,
  pathToString,
  pathsToString
} from './path'

/**
 * Typed RouteRecordBase
 */
export type _RoutiderRouteRecordBase<
  T extends string | undefined = string | undefined
> = Omit<_RouteRecordBase, 'path' | 'name' | 'alias'> & {
  /**
   * Path of the record. Should start with / unless the record is the child of another record.
   * @example createPath`/users/${'id'}` matches `/users/1` as well as `/users/posva`. '/users' matches only `/users`.
   */
  path: RoutiderPath<T> | string | RoutiderPaths<T> | string[]
}

interface RoutiderRouteRecordSingleView<
  T extends string | undefined = string | undefined
> extends _RoutiderRouteRecordBase<T> {
  /**
   * Component to display when the URL matches this route.
   */
  component: RawRouteComponent
  /**
   * Allow passing down params as props to the component rendered by `router-view`.
   */
  props?: _RouteRecordProps
}
interface RoutiderRouteRecordMultipleViews<
  T extends string | undefined = string | undefined
> extends _RoutiderRouteRecordBase<T> {
  /**
   * Components to display when the URL matches this route. Allow using named views.
   */
  components: Record<string, RawRouteComponent>
  /**
   * Allow passing down params as props to the component rendered by
   * `router-view`. Should be an object with the same keys as `components` or a
   * boolean to be applied to every component.
   */
  props?: Record<string, _RouteRecordProps> | boolean
}
interface RoutiderRouteRecordRedirect<
  T extends string | undefined = string | undefined
> extends _RoutiderRouteRecordBase<T> {
  redirect: RouteRecordRedirectOption
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  path: RoutiderPath<any> | string | RoutiderPaths<any> | string[]
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
