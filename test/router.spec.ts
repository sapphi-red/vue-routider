import { createMemoryHistory } from 'vue-router'
import { createRoutider, createPath } from '#/index'
import { isTypeEqual } from '#/test-util'

describe('createRoutider', () => {
  const { useRoute } = createRoutider({
    history: createMemoryHistory(),
    routes: {
      Index: {
        path: '/'
      },
      Item: {
        path: createPath`/items/${'id'}`
      },
      UserItem: {
        path: createPath`/users/${'userId'}/${'itemId'}`
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
})
