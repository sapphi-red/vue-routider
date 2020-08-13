import { createMemoryHistory } from 'vue-router'
import { createRoutider, createPath } from '#/index'
import { isTypeEqual } from '#/test-util'

describe('createRoutider', () => {
  const { useRoute } = createRoutider({
    history: createMemoryHistory(),
    routes: {
      Item: {
        path: createPath`/items/${'id'}`
      },
      UserItem: {
        path: createPath`/users/${'userId'}/${'itemId'}`
      }
    }
  })

  it('has typed routes (1)', () => {
    const route = useRoute('Item')

    isTypeEqual<{ id: string }, typeof route.params>(true)
  })

  it('has typed routes (2)', () => {
    const route = useRoute('UserItem')

    isTypeEqual<{ userId: string; itemId: string }, typeof route.params>(true)
  })
})
