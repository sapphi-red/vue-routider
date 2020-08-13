import { createMemoryHistory } from 'vue-router'
import { createRoutider, createPath, createPaths } from '#/index'
import { isTypeEqual } from '#/test-util'
import { defineComponent } from 'vue'

describe('createRoutider', () => {
  const com = defineComponent({})

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
