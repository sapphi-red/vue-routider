import { createPath, createPaths, RoutiderOptionsRoutes } from '#/index'
import { isSubType } from '#/test-util'
import { defineComponent } from 'vue'

const com = defineComponent({})

describe('routiderOptions', () => {
  it('can detect valid path (1)', () => {
    const options = {
      Index: {
        path: '/',
        component: com
      }
    }
    isSubType<RoutiderOptionsRoutes, typeof options>(true)
  })
  it('can detect valid path (2)', () => {
    const options = {
      Index: {
        path: createPath`/`,
        component: com
      }
    }
    isSubType<RoutiderOptionsRoutes, typeof options>(true)
  })
  it('can detect valid path (3)', () => {
    const options = {
      Index: {
        path: createPath`/item/${'id'}`,
        component: com
      }
    }
    isSubType<RoutiderOptionsRoutes, typeof options>(true)
  })
  it('can detect valid path (4)', () => {
    const options = {
      Index: {
        path: ['/', '/index'],
        component: com
      }
    }
    isSubType<RoutiderOptionsRoutes, typeof options>(true)
  })
  it('can detect valid path (5)', () => {
    const options = {
      Index: {
        path: createPaths(createPath`/items`, createPath`/i`),
        component: com
      }
    }
    isSubType<RoutiderOptionsRoutes, typeof options>(true)
  })
  it('can detect valid path (6)', () => {
    const options = {
      Index: {
        path: createPaths(createPath`/items/${'id'}`, createPath`/i/${'id'}`),
        component: com
      }
    }
    isSubType<RoutiderOptionsRoutes, typeof options>(true)
  })

  it('can detect invalid path (1)', () => {
    const options = {
      Index: {
        path: 0,
        component: com
      }
    }
    isSubType<RoutiderOptionsRoutes, typeof options>(false)
  })
  it('can detect invalid path (2)', () => {
    const options = {
      Index: {
        path: [createPath`/items`, createPath`/i`],
        component: com
      }
    }
    isSubType<RoutiderOptionsRoutes, typeof options>(false)
  })
  it('can detect invalid path (3)', () => {
    const options = {
      Index: {
        path: [createPath`/items/${'id'}`, createPath`/i/${'itemId'}`],
        component: com
      }
    }
    isSubType<RoutiderOptionsRoutes, typeof options>(false)
  })
})
