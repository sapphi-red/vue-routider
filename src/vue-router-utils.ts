// Code from vue-router
// Copyright (c) 2020 Eduardo San Martin Morote
// Released under the MIT license
// https://github.com/vuejs/vue-router-next/blob/master/LICENSE

import { Component } from 'vue'
import {
  RouteLocationNormalized,
  RouteLocationRaw,
  RouteLocation
} from 'vue-router'

type Lazy<T> = () => Promise<T>
export type RawRouteComponent = Component | Lazy<Component>

export type _RouteRecordProps =
  | boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((to: RouteLocationNormalized) => Record<string, any>)

export type RouteRecordRedirectOption =
  | RouteLocationRaw
  | ((to: RouteLocation) => RouteLocationRaw)
