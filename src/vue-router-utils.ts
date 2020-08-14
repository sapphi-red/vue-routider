// Code from vue-router
// Copyright (c) 2020 Eduardo San Martin Morote
// Released under the MIT license
// https://github.com/vuejs/vue-router-next/blob/master/LICENSE

import { Component, ComponentPublicInstance } from 'vue'
import { RouteLocationRaw, RouteLocation, LocationQueryRaw } from 'vue-router'

type Lazy<T> = () => Promise<T>
export type RawRouteComponent = Component | Lazy<Component>

export type RouteRecordRedirectOption =
  | RouteLocationRaw
  | ((to: RouteLocation) => RouteLocationRaw)

export interface RouteQueryAndHash {
  query?: LocationQueryRaw
  hash?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NavigationGuardNextCallback = (vm: ComponentPublicInstance) => any
export type NavigationGuardReturn =
  | void
  | Error
  | RouteLocationRaw
  | boolean
  | NavigationGuardNextCallback
