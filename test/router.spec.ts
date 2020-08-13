import { createMemoryHistory } from 'vue-router'
import { createRoutider, createPath } from '#/index'
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
