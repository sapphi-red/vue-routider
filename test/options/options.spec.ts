import {
  createPath,
  createPaths,
  RoutiderRoutes,
  createRoutider,
  routiderRoutesToRouteRecords
} from '#/index'
import { isSubType, isSameType } from '#/test-util'
import { defineComponent } from 'vue'
import { createMemoryHistory } from 'vue-router'

const com = defineComponent({})

describe('routiderOptions', () => {
  it('can detect valid path (1)', () => {
    const options = {
      Index: {
        path: '/',
        component: com
      }
    }
    isSubType<RoutiderRoutes, typeof options>(true)
  })
  it('can detect valid path (2)', () => {
    const options = {
      Index: {
        path: createPath`/`,
        component: com
      }
    }
    isSubType<RoutiderRoutes, typeof options>(true)
  })
  it('can detect valid path (3)', () => {
    const options = {
      Index: {
        path: createPath`/item/${'id'}`,
        component: com
      }
    }
    isSubType<RoutiderRoutes, typeof options>(true)
  })
  it('can detect valid path (4)', () => {
    const options = {
      Index: {
        path: ['/', '/index'],
        component: com
      }
    }
    isSubType<RoutiderRoutes, typeof options>(true)
  })
  it('can detect valid path (5)', () => {
    const options = {
      Index: {
        path: createPaths(createPath`/items`, createPath`/i`),
        component: com
      }
    }
    isSubType<RoutiderRoutes, typeof options>(true)
  })
  it('can detect valid path (6)', () => {
    const options = {
      Index: {
        path: createPaths(createPath`/items/${'id'}`, createPath`/i/${'id'}`),
        component: com
      }
    }
    isSubType<RoutiderRoutes, typeof options>(true)
  })

  it('can declare nested route', () => {
    const options = {
      User: {
        path: createPath`/users/${'userId'}`,
        component: com,
        children: {
          UserItem: {
            path: createPath`${'itemId'}`,
            component: com,
            children: {
              UserItemDetail: {
                path: createPath`detail`,
                component: com
              }
            }
          }
        }
      }
    }
    isSubType<RoutiderRoutes, typeof options>(true)
  })

  it('can declare redirect path', () => {
    const routes = {
      About: {
        path: '/about',
        component: com
      },
      Desc: {
        path: createPath`/desc/${'id'}`,
        redirect: (): unknown =>
          createRedirect('Desc', to => {
            isSameType<typeof to.params, { id: string | string[] }>(true)

            const newTo: unknown = ensureLocationType({ name: 'About' })
            return newTo
          })
      }
    }

    const { ensureLocationType, createRedirect } = createRoutider({
      history: createMemoryHistory(),
      routes
    })

    isSubType<RoutiderRoutes, typeof routes>(true)
  })
  it('can declare beforeEnter', () => {
    const routes = {
      Item: {
        path: createPath`/item/${'id'}`,
        component: com,
        beforeEnter: (to, from, next) => {
          isSameType<typeof to.params, { id: string | string[] }>(true)
          isSameType<typeof from.params, Record<never, never>>(true)

          const newTo = ensureLocationType({
            name: 'Item',
            params: { id: '1' }
          })
          next(newTo)
        }
      }
    }

    const { ensureLocationType } = createRoutider({
      history: createMemoryHistory(),
      routes
    })

    isSubType<RoutiderRoutes, typeof routes>(true)
  })

  it('can detect invalid path (1)', () => {
    const options = {
      Index: {
        path: 0,
        component: com
      }
    }
    isSubType<RoutiderRoutes, typeof options>(false)
  })
  it('can detect invalid path (2)', () => {
    const options = {
      Index: {
        path: [createPath`/items`, createPath`/i`],
        component: com
      }
    }
    isSubType<RoutiderRoutes, typeof options>(false)
  })
  it('can detect invalid path (3)', () => {
    const options = {
      Index: {
        path: [createPath`/items/${'id'}`, createPath`/i/${'itemId'}`],
        component: com
      }
    }
    isSubType<RoutiderRoutes, typeof options>(false)
  })
})

describe('routiderRoutesToRouteRecords', () => {
  it('can convert normal routes', () => {
    const route = {
      Index: {
        path: '/',
        component: com
      }
    }
    const actual = routiderRoutesToRouteRecords(route)
    expect(actual).toStrictEqual([
      {
        name: 'Index',
        path: '/',
        component: com,
        children: undefined
      }
    ])
  })
  it('can convert nested routes', () => {
    const route = {
      User: {
        path: createPath`/users/${'userId'}`,
        component: com,
        children: {
          UserItem: {
            path: createPath`${'itemId'}`,
            component: com,
            children: {
              UserItemDetail: {
                path: createPath`detail`,
                component: com
              }
            }
          }
        }
      }
    }
    const actual = routiderRoutesToRouteRecords(route)
    expect(actual).toStrictEqual([
      {
        name: 'User',
        path: '/users/:userId',
        component: com,
        children: [
          {
            name: 'UserItem',
            path: ':itemId',
            component: com,
            children: [
              {
                name: 'UserItemDetail',
                path: 'detail',
                component: com,
                children: undefined
              }
            ]
          }
        ]
      }
    ])
  })

  it('should warn if nested routes includes absolute path', () => {
    const route = {
      User: {
        path: createPath`/users/${'userId'}`,
        component: com,
        children: {
          UserItem: {
            path: createPath`/${'itemId'}`,
            component: com
          }
        }
      }
    }

    console.warn = jest.fn()
    routiderRoutesToRouteRecords(route)
    expect(console.warn).toBeCalled()
  })
})
