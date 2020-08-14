import {
  createPath,
  createPaths,
  RoutiderPath,
  RoutiderPaths,
  pathToString,
  pathsToString
} from '#/options/path'
import { isTypeEqual } from '#/test-util'

const none = createPath`/`
const a = createPath`/a/${'a'}`
const a2 = createPath`/a2/${'a'}`
const a3 = createPath`/a3/${'a'}`
const a4 = createPath`/a4/${'a'}`
const a5 = createPath`/a5/${'a'}`
const b = createPath`/b/${'b'}`
const ab = createPath`/ab/${'a'}/${'b'}`
const ab2 = createPath`/ab2/${'a'}/${'b'}`

describe('createPath', () => {
  it('can create path without params', () => {
    expect(none).toBe('/')
    isTypeEqual<RoutiderPath<undefined>, typeof none>(true)
  })
  it('can create path (1)', () => {
    expect(a).toBe('/a/:a')
    isTypeEqual<RoutiderPath<'a'>, typeof a>(true)
  })
  it('can create path (2)', () => {
    expect(b).toBe('/b/:b')
    isTypeEqual<RoutiderPath<'b'>, typeof b>(true)
  })
  it('can create path (3)', () => {
    expect(ab).toBe('/ab/:a/:b')
    isTypeEqual<RoutiderPath<'a' | 'b'>, typeof ab>(true)
  })

  it('should warn if it includes `:` (1)', () => {
    console.warn = jest.fn()
    createPath`/:id`
    expect(console.warn).toBeCalled()
  })
  it('should warn if it includes `:` (2)', () => {
    console.warn = jest.fn()
    createPath`/item/${':id'}`
    expect(console.warn).toBeCalled()
  })
})

describe('createPaths', () => {
  it('can create paths (1)', () => {
    const paths = createPaths(a, a2)
    expect(paths).toStrictEqual(['/a/:a', '/a2/:a'])
    isTypeEqual<RoutiderPaths<'a'>, typeof paths>(true)
  })
  it('can create paths (2)', () => {
    const paths = createPaths(ab, ab2)
    expect(paths).toStrictEqual(['/ab/:a/:b', '/ab2/:a/:b'])
    isTypeEqual<RoutiderPaths<'a' | 'b'>, typeof paths>(true)
  })
  it('can create paths (3)', () => {
    const paths = createPaths(a, a2, a3, a4, a5)
    expect(paths).toStrictEqual([
      '/a/:a',
      '/a2/:a',
      '/a3/:a',
      '/a4/:a',
      '/a5/:a'
    ])
    isTypeEqual<RoutiderPaths<'a'>, typeof paths>(true)
  })
  it('can reject invalid paths (1)', () => {
    const paths = createPaths(a, b)
    isTypeEqual<void[], typeof paths>(true)
  })
  it('can reject invalid paths (2)', () => {
    const paths = createPaths(a, ab)
    isTypeEqual<void[], typeof paths>(true)
  })
  it('can reject invalid paths (3)', () => {
    const paths = createPaths(none, a)
    isTypeEqual<void[], typeof paths>(true)
  })
  it('can reject invalid paths (4)', () => {
    const paths = createPaths(a, a2, a3, ab)
    isTypeEqual<void[], typeof paths>(true)
  })
})

describe('pathToString', () => {
  it('can convert type', () => {
    const actual = pathToString(a)
    expect(actual).toBe(a)
  })
})

describe('pathsToString', () => {
  it('can convert type (1)', () => {
    const paths = createPaths(a, a2)
    const actual = pathsToString(paths)
    expect(actual).toBe(paths)
  })
  it('can convert type (2)', () => {
    const paths = createPaths(a, a2, a3, a4, a5)
    const actual = pathsToString(paths)
    expect(actual).toBe(paths)
  })
})
