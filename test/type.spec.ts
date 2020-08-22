import {
  Same,
  UnionToIntersection,
  IfNotUnion,
  IfNotAny,
  IfNotUndefined,
  IsNotAnyOrUndefined,
  EntityOrArrayToUnion,
  IfNotString
} from '#/type'
import { isTypeEqual, isSameType } from '#/test-util'

describe('Same', () => {
  it('can detect primitives', () => {
    isTypeEqual<Same<string, string>, true>(true)
    isTypeEqual<Same<number, string>, false>(true)
  })
  it('can detect literals', () => {
    isTypeEqual<Same<'aa', 'aa'>, true>(true)
    isTypeEqual<Same<'aa', 'bb'>, false>(true)
  })
  it('can detect records', () => {
    isTypeEqual<Same<Record<string, string>, Record<string, string>>, true>(
      true
    )
    isTypeEqual<Same<Record<'aa', string>, Record<'a', string>>, false>(true)
  })
  it('can detect optionals', () => {
    isTypeEqual<Same<{ a: 0; b?: 1 }, { a: 0; b?: 1 }>, true>(true)
    isTypeEqual<Same<{ a: 0; b: 1 }, { a: 0; b?: 1 }>, false>(true)

    // need to check with Required<>
    // eslint-disable-next-line @typescript-eslint/ban-types
    isTypeEqual<Same<Required<{}>, Required<{ a?: 0; b?: 1 }>>, false>(true)
  })
})

describe('IfNotAny', () => {
  it('can detect any', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isTypeEqual<IfNotAny<any>, never>(true)
  })
  it('can detect not any', () => {
    isTypeEqual<IfNotAny<string>, string>(true)
  })
})

describe('IfNotUndefined', () => {
  it('can detect undefined', () => {
    isTypeEqual<IfNotUndefined<undefined>, never>(true)
  })
  it('can detect not undefined', () => {
    isTypeEqual<IfNotUndefined<string>, string>(true)
  })
})

describe('IsNotAnyOrUndefined', () => {
  it('can detect any', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isTypeEqual<IsNotAnyOrUndefined<any>, false>(true)
  })
  it('can detect undefined', () => {
    isTypeEqual<IsNotAnyOrUndefined<undefined>, false>(true)
  })
  it('can detect not undefined', () => {
    isTypeEqual<IsNotAnyOrUndefined<string>, true>(true)
  })
})

describe('UnionToIntersection', () => {
  it('can convert union to intersection (1)', () => {
    type A = 'a' | 'b' | 'c'
    isTypeEqual<UnionToIntersection<A>, never>(true)
  })
  it('can convert union to intersection (2)', () => {
    type A = { str: 'a'; number: 0 } | { str: 'b'; number: 1 }
    isTypeEqual<UnionToIntersection<A>, never>(true)
  })
  it('can convert union to intersection (3)', () => {
    type A = { str: 'a' } | { number: 0 }
    isTypeEqual<UnionToIntersection<A>, { str: 'a' } & { number: 0 }>(true)
  })
  it('can convert union to intersection (4)', () => {
    type A = ({ str: 'a' } & { number: 0 }) | { symbol: symbol }
    type B = { str: 'a' } & { number: 0 } & { symbol: symbol }
    isTypeEqual<UnionToIntersection<A>, B>(true)
  })
  it('can convert union to intersection (5)', () => {
    type A = ({ str: 'a' } | { number: 0 }) & { symbol: symbol }
    type B = { str: 'a' } & { number: 0 } & { symbol: symbol }
    isTypeEqual<UnionToIntersection<A>, B>(true)
  })
})

describe('IfNotUnion', () => {
  it('can detect non-union (1)', () => {
    type A = 'a'
    isTypeEqual<IfNotUnion<A>, 'a'>(true)
  })
  it('can detect non-union (2)', () => {
    type A = string
    isTypeEqual<IfNotUnion<A>, string>(true)
  })
  it('can detect non-union (3)', () => {
    type A = 0
    isTypeEqual<IfNotUnion<A>, 0>(true)
  })
  it('can detect non-union (4)', () => {
    type A = undefined
    isTypeEqual<IfNotUnion<A>, undefined>(true)
  })
  it('can detect non-union (5)', () => {
    type A = { str: 'a' } & { num: 0 }
    isTypeEqual<IfNotUnion<A>, A>(true)
  })

  it('can detect union (1)', () => {
    type A = 'a' | 'b'
    isTypeEqual<IfNotUnion<A>, void>(true)
  })
  it('can detect union (2)', () => {
    type A = 'a' | 'b' | 'c' | 'd' | 'e'
    isTypeEqual<IfNotUnion<A>, void>(true)
  })
  it('can detect union (3)', () => {
    type A = 'a' | 1 | true
    isTypeEqual<IfNotUnion<A>, void>(true)
  })
  it('can detect union (4)', () => {
    type A = { str: 'a' } | { str: 'b' }
    isTypeEqual<IfNotUnion<A>, void>(true)
  })
})

describe('EntityOrArrayToUnion', () => {
  it('can convert to union (1)', () => {
    type A = string | string[]
    isTypeEqual<EntityOrArrayToUnion<A>, string>(true)
  })
  it('can convert to union (2)', () => {
    type A = 0 | 0[]
    isTypeEqual<EntityOrArrayToUnion<A>, 0>(true)
  })
  it('can convert to union (3)', () => {
    type A = undefined | undefined[]
    isTypeEqual<EntityOrArrayToUnion<A>, undefined>(true)
  })
  it('can convert to union (4)', () => {
    type A = { key: 'value' } | Array<{ key: 'value' }>
    isSameType<EntityOrArrayToUnion<A>, { key: 'value' }>(true)
  })
})

describe('IfNotString', () => {
  it('can detect string', () => {
    isTypeEqual<IfNotString<string>, never>(true)
  })
  it('can detect string literal (1)', () => {
    isTypeEqual<IfNotString<'a'>, 'a'>(true)
  })
  it('can detect string literal (2)', () => {
    isTypeEqual<IfNotString<'a' | 'b'>, 'a' | 'b'>(true)
  })
  it('can detect primitive', () => {
    isTypeEqual<IfNotString<number>, number>(true)
  })
  it('can detect undefined', () => {
    isTypeEqual<IfNotString<undefined>, undefined>(true)
  })
})
