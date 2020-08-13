import { IfNotUnion } from './type'

declare const params: unique symbol
export type RoutiderPath<T extends string | undefined> = { [params]: T }
export type RoutiderPaths<T extends string | undefined> = typeof params &
  RoutiderPath<T>[]

export type ExtractParams<T> = T extends RoutiderPath<infer P>
  ? P
  : T extends RoutiderPaths<infer P>
  ? P
  : never

/**
 * Creates typed path.
 *
 * @example createPath`/items/${'id'}`
 */
export function createPath(
  literals: TemplateStringsArray
): RoutiderPath<undefined>
export function createPath<T extends string>(
  literals: TemplateStringsArray,
  ...placeholders: T[]
): RoutiderPath<T>
export function createPath<T extends string>(
  literals: TemplateStringsArray,
  ...placeholders: T[]
): RoutiderPath<T> {
  let path = ''
  for (let i = 0; i < placeholders.length; i++) {
    path += literals[i] + ':' + placeholders[i]
  }
  path += literals[literals.length - 1]
  return (path as unknown) as RoutiderPath<T>
}

type PathArrayToPaths<T> = T extends RoutiderPath<infer S>[]
  ? RoutiderPaths<S>
  : T

export const createPaths = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends RoutiderPath<any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  S extends RoutiderPath<any>
>(
  path1: T,
  path2: S
): PathArrayToPaths<IfNotUnion<T | S>[]> =>
  [path1, path2] as PathArrayToPaths<IfNotUnion<T | S>[]>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pathToString = (path: RoutiderPath<any> | string): string =>
  path as string

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pathsToString = (paths: RoutiderPaths<any> | string[]): string[] =>
  paths as string[]
