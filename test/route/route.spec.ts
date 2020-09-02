import { RouteRecordRaw } from 'vue-router'
import {
  RoutiderRouteRecord,
  pathToPathAndAlias,
  createRoute
} from '#/route/route'
import { isSubType, isTypeEqual } from '#/test-util'
import { createPath, createPaths } from '#/options/path'
import { defineComponent } from 'vue'
import { createQueries } from '#/options/queries'

const Com = defineComponent({
  template: '<div></div>'
})

describe('RoutiderRouteRecord compatibility', () => {
  it('has compatibility with RouteRecordRaw', () => {
    type Original = Omit<RouteRecordRaw, 'path' | 'children' | 'beforeEnter'>
    type Custom = Omit<RoutiderRouteRecord, 'path' | 'children' | 'beforeEnter'>

    isSubType<Original, Custom>(true)
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

describe('createRoute', () => {
  it('can infer route type (1)', () => {
    const route = createRoute({
      path: '/',
      component: Com
    })
    isTypeEqual<
      typeof route,
      RoutiderRouteRecord<undefined, undefined, undefined>
    >(true)
  })
  it('can infer route type (2)', () => {
    const route = createRoute({
      path: createPath`/`,
      component: Com
    })
    isTypeEqual<
      typeof route,
      RoutiderRouteRecord<undefined, undefined, undefined>
    >(true)
  })
  it('can infer route type (3)', () => {
    const route = createRoute({
      path: createPath`/items/${'id'}`,
      component: Com
    })
    isTypeEqual<typeof route, RoutiderRouteRecord<'id', undefined, undefined>>(
      true
    )
  })
  it('can infer route type (4)', () => {
    const route = createRoute({
      path: '/',
      component: Com,
      query: createQueries('id')
    })
    isTypeEqual<typeof route, RoutiderRouteRecord<undefined, 'id', undefined>>(
      true
    )
  })
  it('can infer route type (5)', () => {
    const route = createRoute({
      path: createPath`/items/${'id'}`,
      component: Com,
      query: createQueries('id')
    })
    isTypeEqual<typeof route, RoutiderRouteRecord<'id', 'id', undefined>>(true)
  })
  it('can infer route type (5)', () => {
    const route = createRoute({
      path: createPath`/items/${'id'}`,
      component: Com,
      children: {
        Child: {
          path: '/child',
          component: Com
        }
      }
    })
    isTypeEqual<
      typeof route,
      RoutiderRouteRecord<
        'id',
        undefined,
        {
          Child: {
            path: string
            component: typeof Com
          }
        }
      >
    >(true)
  })
})
