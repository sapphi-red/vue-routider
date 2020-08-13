import { createMemoryHistory } from 'vue-router'
import {
  createRoutider,
  createPath,
  createPaths,
  RoutiderOptionsRoutes
} from '#/index'
import { isSubType, isTypeEqual } from '#/test-util'
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

describe('createRoutider', () => {
  const { useRoute } = createRoutider({
    history: createMemoryHistory(),
    routes: {
      Index: {
        path: '/',
        component: com
      },
      Item: {
        path: createPath`/items/${'id'}`,
        component: com
      },
      UserItem: {
        path: createPath`/users/${'userId'}/${'itemId'}`,
        component: com
      },
      About: {
        path: createPath`/`,
        component: com
      },
      Desc: {
        path: ['/desc', '/description'],
        component: com
      },
      User: {
        path: createPaths(createPath`/users/${'id'}`, createPath`/u/${'id'}`),
        component: com
      }
    }
  })

  it('has typed route (1)', () => {
    const route = useRoute('Item')

    isTypeEqual<{ id: string }, typeof route.params>(true)
  })

  it('has typed route (2)', () => {
    const route = useRoute('UserItem')

    isTypeEqual<{ userId: string; itemId: string }, typeof route.params>(true)
  })

  it('has typed route (3)', () => {
    const route = useRoute('Index')

    isTypeEqual<Record<never, string>, typeof route.params>(true)
  })

  it('has typed route (4)', () => {
    const route = useRoute('About')

    isTypeEqual<Record<never, string>, typeof route.params>(true)
  })

  it('has typed route (5)', () => {
    const route = useRoute('Desc')

    isTypeEqual<Record<never, string>, typeof route.params>(true)
  })

  it('has typed route (6)', () => {
    const route = useRoute('User')

    isTypeEqual<{ id: string }, typeof route.params>(true)
  })
})
