import { createMemoryHistory } from 'vue-router'
import { createRoutider, createPath } from '#/index'
import { isTypeEqual } from '#/test-util'
import { defineComponent } from 'vue'

const com = defineComponent({})

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
        path: createPath`/users/${'userId'}/${'id'}`,
        component: com
      },
      About: {
        path: createPath`/`,
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

    isTypeEqual<{ userId: string; id: string }, typeof route.params>(true)
  })

  it('has typed route (3)', () => {
    const route = useRoute('Index')

    isTypeEqual<Record<never, string>, typeof route.params>(true)
  })

  it('has typed route (4)', () => {
    const route = useRoute('About')

    isTypeEqual<Record<never, string>, typeof route.params>(true)
  })

  it('has intersection typed route (1)', () => {
    const route = useRoute(['Item', 'UserItem'])

    isTypeEqual<{ id: string }, typeof route.params>(true)
  })
  it('has intersection typed route (2)', () => {
    const route = useRoute(['Item', 'UserItem', 'About'])

    isTypeEqual<Record<never, string>, typeof route.params>(true)
  })
  it('has intersection typed route (3)', () => {
    const route = useRoute(['Index', 'About'])

    isTypeEqual<Record<never, string>, typeof route.params>(true)
  })

  it('has untyped route', () => {
    const route = useRoute(null)

    isTypeEqual<Record<string, string>, typeof route.params>(true)
  })
})
