import {
  createPath,
  createPaths,
  RoutiderRoutes,
  createRoute,
  createRoutider
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

  it('can declare redirect path', () => {
    const routes = {
      About: {
        path: '/about',
        component: com
      },
      Desc: createRoute({
        path: createPath`/desc/${'id'}`,
        redirect: to => {
          isSameType<typeof to.params, { id: string }>(true)

          const newTo: unknown = ensureLocationType({ name: 'About' })
          return newTo
        }
      })
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
