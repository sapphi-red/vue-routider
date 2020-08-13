import { UnionToIntersection, IfNotUnion } from '#/type'
import { isTypeEqual } from '#/test-util'

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
