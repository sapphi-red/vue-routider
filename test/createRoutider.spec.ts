import { createMemoryHistory } from 'vue-router'
import { createRoutider, createPath } from '#/index'
import { isSameType } from '#/test-util'
import { defineComponent } from 'vue'

type NeverRecord = Record<never, never>

const com = defineComponent({})

describe('createRoutider', () => {
  const { useRoute, useRouter } = createRoutider({
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
  const router = useRouter()

  it('has typed route (1)', () => {
    const route = useRoute('Item')

    isSameType<{ id: string }, typeof route.params>(true)
  })

  it('has typed route (2)', () => {
    const route = useRoute('UserItem')

    isSameType<{ userId: string; id: string }, typeof route.params>(true)
  })

  it('has typed route (3)', () => {
    const route = useRoute('Index')

    isSameType<NeverRecord, typeof route.params>(true)
  })

  it('has typed route (4)', () => {
    const route = useRoute('About')

    isSameType<NeverRecord, typeof route.params>(true)
  })

  it('has intersection and union typed route', () => {
    const route = useRoute(['Item', 'UserItem'])

    isSameType<{ userId?: string; id: string }, typeof route.params>(true)
  })
  it('has union typed route', () => {
    const route = useRoute(['Item', 'UserItem', 'About'])

    isSameType<{ userId?: string; id?: string }, typeof route.params>(true)
  })
  it('has intersection typed route', () => {
    const route = useRoute(['Index', 'About'])

    isSameType<NeverRecord, typeof route.params>(true)
  })

  it('has untyped route', () => {
    const route = useRoute(null)

    isSameType<Record<string, string | undefined>, typeof route.params>(true)
  })

  it('has typed router.push (1)', () => {
    router.push({ name: 'About' })
  })
  it('has typed router.push (2)', () => {
    router.push({ name: 'Index' })
  })
  it('has typed router.push (3)', () => {
    router.push({ name: 'Item', params: { id: '1' } })
  })
  it('has typed router.push (4)', () => {
    router.push({ name: 'UserItem', params: { id: '1', userId: '1' } })
  })
  it('can accept genetic route with router.push', () => {
    const rs = [
      { name: 'About' },
      { name: 'Index' },
      { name: 'About', params: { id: '1' } }
    ] as const

    rs.forEach(r => {
      router.push(r)
    })
  })
})
