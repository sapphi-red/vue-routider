/* eslint-disable @typescript-eslint/ban-ts-comment */
import { isTypeEqual } from '#/test-util'
import { createQueries } from '#/options/queries'

describe('createQueries', () => {
  it('can create queries with one param', () => {
    const query = createQueries('one')
    expect(query).toStrictEqual(['one'])
    isTypeEqual<Array<'one'>, typeof query>(true)
  })
  it('can create queries with two params', () => {
    const query = createQueries('one', 'two')
    expect(query).toStrictEqual(['one', 'two'])
    isTypeEqual<Array<'one' | 'two'>, typeof query>(true)
  })
  it('can create queries with three params', () => {
    const query = createQueries('one', 'two', 'three')
    expect(query).toStrictEqual(['one', 'two', 'three'])
    isTypeEqual<Array<'one' | 'two' | 'three'>, typeof query>(true)
  })
  it('can create queries with const array', () => {
    const arr = ['one', 'two'] as const
    const query = createQueries(...arr)
    expect(query).toStrictEqual(['one', 'two'])
    isTypeEqual<Array<'one' | 'two'>, typeof query>(true)
  })

  it('cannot create queries with string array', () => {
    const arr = ['one', 'two']
    // @ts-expect-error
    createQueries(...arr)
    expect(true).toBe(true)
  })

  it('should warn if it includes same string (1)', () => {
    console.warn = jest.fn()
    createQueries('id', 'id')
    expect(console.warn).toBeCalled()
  })
  it('should warn if it includes same string (2)', () => {
    console.warn = jest.fn()
    createQueries('id', 'id2', 'id')
    expect(console.warn).toBeCalled()
  })
})
