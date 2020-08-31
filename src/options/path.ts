import { IfNotUnion, IfNotString, NeverToUndefined } from '../type'
import warning from 'tiny-warning'

export type Path<T extends string | undefined = string | undefined> =
  | string
  | string[]
  | RoutiderPath<T>
  | RoutiderPaths<T>

export type CobinePaths<P1 extends Path, P2 extends Path> = RoutiderPath<
  NeverToUndefined<ExtractParams<P1> | ExtractParams<P2>>
>

/**
 * fake symbol for nominal typing
 */
declare const params: unique symbol

/**
 * Type for valid path
 */
export type RoutiderPath<T extends string | undefined = string | undefined> = {
  readonly [params]: T
}
/**
 * Type for valid path and aliases
 */
export type RoutiderPaths<
  T extends string | undefined = string | undefined
> = typeof params & RoutiderPath<T>[]

/**
 * Extracts params from RoutiderPath & RoutiderPaths
 */
export type ExtractParams<T> = Exclude<
  T extends never
    ? never
    : T extends RoutiderPath<infer P>
    ? P
    : T extends RoutiderPaths<infer P>
    ? P
    : never,
  undefined
>

/**
 * Creates typed path.
 *
 * @example createPath`/items/${'id'}`
 */
export function createPath(
  literals: Readonly<TemplateStringsArray>
): RoutiderPath<undefined>
export function createPath<T extends string>(
  literals: Readonly<TemplateStringsArray>,
  ...placeholders: readonly T[]
): RoutiderPath<IfNotString<T>>
export function createPath<T extends string>(
  literals: Readonly<TemplateStringsArray>,
  ...placeholders: readonly T[]
): RoutiderPath<IfNotString<T>> {
  let path = ''
  for (let i = 0; i < placeholders.length; i++) {
    const l = literals[i]
    const p = placeholders[i]
    path += `${l}:${p}`

    warning(
      !l.includes(':'),
      `vue-routider: \`:\` should not be included in createPath argument. (${l})`
    )
    warning(
      !p.includes(':'),
      `vue-routider: \`:\` should not be included in createPath argument. (${p})`
    )
  }
  const lastL = literals[literals.length - 1]
  path += lastL
  warning(
    !lastL.includes(':'),
    `vue-routider: \`:\` should not be included in createPath argument. (${lastL})`
  )
  return (path as unknown) as RoutiderPath<IfNotString<T>>
}

type PathArrayToPaths<T> = T extends RoutiderPath<infer S>
  ? RoutiderPaths<S>
  : T[]

export function createPaths<
  T extends readonly [RoutiderPath, RoutiderPath, ...RoutiderPath[]]
>(...args: T): PathArrayToPaths<IfNotUnion<T[number]>> {
  return (args as unknown) as PathArrayToPaths<IfNotUnion<T[number]>>
}

export const pathToString = (path: RoutiderPath | string): string =>
  path as string

export const pathsToString = (paths: RoutiderPaths | string[]): string[] =>
  paths as string[]
