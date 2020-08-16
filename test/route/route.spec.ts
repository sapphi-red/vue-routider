import { RouteRecord } from 'vue-router'
import { RoutiderRouteRecord, pathToPathAndAlias } from '#/route/route'
import { isSubType } from '#/test-util'
import { createPath, createPaths } from '#/options/path'

describe('RoutiderRouteRecord compatibility', () => {
  it('has compatibility with RouteRecord', () => {
    type Custom = Omit<RoutiderRouteRecord, 'path'>
    type Original = Omit<
      RouteRecord,
      'path' | 'name' | 'alias' | 'children' | 'redirect'
    >

    isSubType<Custom, Original>(true)
  })
})

describe('pathToPathAndAlias', () => {
  it('can transform RoutiderPath', () => {
    const rPath = createPath`/a/${'a'}`
    const actual = pathToPathAndAlias(rPath)
    expect(actual).toStrictEqual({
      path: '/a/:a'
    })
  })

  it('can transform string path', () => {
    const str = '/'
    const actual = pathToPathAndAlias(str)
    expect(actual).toStrictEqual({
      path: '/'
    })
  })

  it('can transform RoutiderPaths', () => {
    const aPath = createPath`/a/${'a'}`
    const bPath = createPath`/b/${'a'}`
    const actual = pathToPathAndAlias(createPaths(aPath, bPath))
    expect(actual).toStrictEqual({
      path: '/a/:a',
      alias: ['/b/:a']
    })
  })

  it('can transform string paths', () => {
    const strs = ['/a', '/b']
    const actual = pathToPathAndAlias(strs)
    expect(actual).toStrictEqual({
      path: '/a',
      alias: ['/b']
    })
  })

  it('occurs error with empty array', () => {
    expect(() => {
      pathToPathAndAlias([])
    }).toThrow()
  })
})
