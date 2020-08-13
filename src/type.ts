export type Equal<Left, Right> = (<U>() => U extends Left ? 1 : 0) extends <
  U
>() => U extends Right ? 1 : 0
  ? true
  : false

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
