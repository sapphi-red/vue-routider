import { IfNotUnion } from './type'

declare const params: unique symbol
export type RoutiderPath<T extends string | undefined = string | undefined> = {
  [params]: T
}
export type RoutiderPaths<
  T extends string | undefined = string | undefined
> = typeof params & RoutiderPath<T>[]

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

export function createPaths<T1 extends RoutiderPath, T2 extends RoutiderPath>(
  p1: T1,
  p2: T2
): PathArrayToPaths<IfNotUnion<T1 | T2>[]>
export function createPaths<
  T1 extends RoutiderPath,
  T2 extends RoutiderPath,
  T3 extends RoutiderPath
>(p1: T1, p2: T2, p3: T3): PathArrayToPaths<IfNotUnion<T1 | T2 | T3>[]>
export function createPaths<
  T1 extends RoutiderPath,
  T2 extends RoutiderPath,
  T3 extends RoutiderPath,
  T4 extends RoutiderPath
>(
  p1: T1,
  p2: T2,
  p3: T3,
  p4: T4
): PathArrayToPaths<IfNotUnion<T1 | T2 | T3 | T4>[]>
export function createPaths<
  T1 extends RoutiderPath,
  T2 extends RoutiderPath,
  T3 extends RoutiderPath,
  T4 extends RoutiderPath,
  T5 extends RoutiderPath
>(
  p1: T1,
  p2: T2,
  p3: T3,
  p4: T4,
  p5: T5
): PathArrayToPaths<IfNotUnion<T1 | T2 | T3 | T4 | T5>[]>
export function createPaths<
  T1 extends RoutiderPath,
  T2 extends RoutiderPath,
  T3 extends RoutiderPath,
  T4 extends RoutiderPath,
  T5 extends RoutiderPath,
  T6 extends RoutiderPath
>(
  p1: T1,
  p2: T2,
  p3: T3,
  p4: T4,
  p5: T5,
  p6: T6
): PathArrayToPaths<IfNotUnion<T1 | T2 | T3 | T4 | T5 | T6>[]>
export function createPaths<
  T1 extends RoutiderPath,
  T2 extends RoutiderPath,
  T3 extends RoutiderPath,
  T4 extends RoutiderPath,
  T5 extends RoutiderPath,
  T6 extends RoutiderPath,
  T7 extends RoutiderPath
>(
  p1: T1,
  p2: T2,
  p3: T3,
  p4: T4,
  p5: T5,
  p6: T6,
  p7: T7
): PathArrayToPaths<IfNotUnion<T1 | T2 | T3 | T4 | T5 | T6 | T7>[]>
export function createPaths<
  T1 extends RoutiderPath,
  T2 extends RoutiderPath,
  T3 extends RoutiderPath,
  T4 extends RoutiderPath,
  T5 extends RoutiderPath,
  T6 extends RoutiderPath,
  T7 extends RoutiderPath,
  T8 extends RoutiderPath
>(
  p1: T1,
  p2: T2,
  p3: T3,
  p4: T4,
  p5: T5,
  p6: T6,
  p7: T7,
  p8: T8
): PathArrayToPaths<IfNotUnion<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>[]>
export function createPaths<
  T1 extends RoutiderPath,
  T2 extends RoutiderPath,
  T3 extends RoutiderPath,
  T4 extends RoutiderPath,
  T5 extends RoutiderPath,
  T6 extends RoutiderPath,
  T7 extends RoutiderPath,
  T8 extends RoutiderPath,
  T9 extends RoutiderPath
>(
  p1: T1,
  p2: T2,
  p3: T3,
  p4: T4,
  p5: T5,
  p6: T6,
  p7: T7,
  p8: T8,
  p9: T9
): PathArrayToPaths<IfNotUnion<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>[]>
export function createPaths<
  T1 extends RoutiderPath,
  T2 extends RoutiderPath,
  T3 extends RoutiderPath,
  T4 extends RoutiderPath,
  T5 extends RoutiderPath,
  T6 extends RoutiderPath,
  T7 extends RoutiderPath,
  T8 extends RoutiderPath,
  T9 extends RoutiderPath,
  T10 extends RoutiderPath
>(
  p1: T1,
  p2: T2,
  p3: T3,
  p4: T4,
  p5: T5,
  p6: T6,
  p7: T7,
  p8: T8,
  p9: T9,
  p10: T10
): PathArrayToPaths<
  IfNotUnion<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>[]
>
export function createPaths<T extends RoutiderPath>(
  ...args: T[]
): PathArrayToPaths<IfNotUnion<T>[]> {
  return args as PathArrayToPaths<IfNotUnion<T>[]>
}

export const pathToString = (path: RoutiderPath | string): string =>
  path as string

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pathsToString = (paths: RoutiderPaths | string[]): string[] =>
  paths as string[]
