export type Equal<Left, Right> = (<U>() => U extends Left ? 1 : 0) extends <
  U
>() => U extends Right ? 1 : 0
  ? true
  : false

export type Same<Left, Right> = Left extends Right
  ? Right extends Left
    ? true
    : false
  : false

// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
export type IfNotAny<T> = 0 extends 1 & T ? never : T
export type IfNotUndefined<T> = Exclude<T, undefined> extends never ? never : T
export type IsNotAnyOrUndefined<T> = IfNotUndefined<IfNotAny<T>> extends never
  ? false
  : true

export type UnionToIntersection<U> = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  U extends any
    ? (k: U) => void
    : never
) extends (k: infer I) => void
  ? I
  : never

export type IfNotUnion<MaybeUnion> = UnionToIntersection<
  MaybeUnion
> extends never
  ? void
  : Equal<MaybeUnion, UnionToIntersection<MaybeUnion>> extends true
  ? MaybeUnion
  : void

export type EntityOrArrayToUnion<T> = T extends infer S | Array<infer S>
  ? S
  : never

export type IfNotString<T> = string extends T ? never : T

export type NeverToUndefined<T> = [T] extends [never] ? undefined : T
