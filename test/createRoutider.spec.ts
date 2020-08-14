import { createMemoryHistory, Router } from 'vue-router'
import { createRoutider, createPath } from '#/index'
import { isSameType, waitNavigation } from '#/test-util'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { createRoute } from '#/route/route'

type NeverRecord = Record<never, never>

const getRouter = async (initPath = '/') => {
  const Com = defineComponent({
    template: '<div></div>'
  })

  const { router: routerInstall, useRoute, useRouter } = createRoutider({
    history: createMemoryHistory(),
    routes: {
      Index: {
        path: '/',
        component: Com
      },
      Item: createRoute({
        path: createPath`/items/${'id'}`,
        component: Com,
        props: to => {
          return { id: to.params.id }
        }
      }),
      UserItem: {
        path: createPath`/users/${'userId'}/${'id'}`,
        component: Com
      },
      About: {
        path: createPath`/about`,
        component: Com
      }
    }
  })
  routerInstall.push(initPath)
  await routerInstall.isReady()
  return { routerInstall, useRoute, useRouter }
}

const runInsideComponent = (routerInstall: Router, func: () => unknown) => {
  const Com = defineComponent({
    template: '<div></div>',
    setup() {
      func()
      return {}
    }
  })
  mount(Com, { global: { plugins: [routerInstall] } })
}

describe('createRoutider', () => {
  it('has typed router.push (1)', async done => {
    const { routerInstall, useRouter, useRoute } = await getRouter()
    runInsideComponent(routerInstall, async () => {
      const router = useRouter()
      router.push({ name: 'About' })

      const route = useRoute(null)
      await waitNavigation(router)
      expect(route.path).toBe('/about')
      done()
    })
  })
  it('has typed router.push (2)', async done => {
    const { routerInstall, useRouter, useRoute } = await getRouter('/about')
    runInsideComponent(routerInstall, async () => {
      const router = useRouter()
      router.push({ name: 'Index' })

      const route = useRoute(null)
      await waitNavigation(router)
      expect(route.path).toBe('/')
      done()
    })
  })
  it('has typed router.push (3)', async done => {
    const { routerInstall, useRouter, useRoute } = await getRouter()
    runInsideComponent(routerInstall, async () => {
      const router = useRouter()
      router.push({ name: 'Item', params: { id: '1' } })

      const route = useRoute(null)
      await waitNavigation(router)
      expect(route.path).toBe('/items/1')
      done()
    })
  })
  it('has typed router.push (4)', async done => {
    const { routerInstall, useRouter, useRoute } = await getRouter()
    runInsideComponent(routerInstall, async () => {
      const router = useRouter()
      router.push({ name: 'UserItem', params: { id: '1', userId: '1' } })

      const route = useRoute(null)
      await waitNavigation(router)
      expect(route.path).toBe('/users/1/1')
      done()
    })
  })
  it('can accept genetic route with router.push', async () => {
    const { routerInstall, useRouter } = await getRouter()
    runInsideComponent(routerInstall, () => {
      const router = useRouter()
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

  it('has typed route (1)', async () => {
    const { routerInstall, useRoute } = await getRouter('/items/1')
    runInsideComponent(routerInstall, () => {
      const route = useRoute('Item')
      isSameType<{ id: string }, typeof route.params>(true)
    })
  })
  it('has typed route (2)', async () => {
    const { routerInstall, useRoute } = await getRouter('/users/1/1')
    runInsideComponent(routerInstall, () => {
      const route = useRoute('UserItem')
      isSameType<{ userId: string; id: string }, typeof route.params>(true)
    })
  })
  it('has typed route (3)', async () => {
    const { routerInstall, useRoute } = await getRouter('/')
    runInsideComponent(routerInstall, () => {
      const route = useRoute('Index')
      isSameType<NeverRecord, typeof route.params>(true)
    })
  })
  it('has typed route (4)', async () => {
    const { routerInstall, useRoute } = await getRouter('/about')
    runInsideComponent(routerInstall, () => {
      const route = useRoute('About')
      isSameType<NeverRecord, typeof route.params>(true)
    })
  })

  it('has intersection and union typed route', async () => {
    const { routerInstall, useRoute } = await getRouter('/items/1')
    runInsideComponent(routerInstall, () => {
      const route = useRoute(['Item', 'UserItem'])
      isSameType<{ userId?: string; id: string }, typeof route.params>(true)
    })
  })
  it('has union typed route', async () => {
    const { routerInstall, useRoute } = await getRouter('/about')
    runInsideComponent(routerInstall, () => {
      const route = useRoute(['Item', 'UserItem', 'About'])
      isSameType<{ userId?: string; id?: string }, typeof route.params>(true)
    })
  })
  it('has intersection typed route', async () => {
    const { routerInstall, useRoute } = await getRouter('/')
    runInsideComponent(routerInstall, () => {
      const route = useRoute(['Index', 'About'])
      isSameType<NeverRecord, typeof route.params>(true)
    })
  })

  it('has untyped route', async () => {
    const { routerInstall, useRoute } = await getRouter('/')
    runInsideComponent(routerInstall, () => {
      const route = useRoute(null)
      isSameType<Record<string, string | undefined>, typeof route.params>(true)
    })
  })

  it('warns if useRoute is called in incorrect path', async () => {
    const { routerInstall, useRoute } = await getRouter('/')
    runInsideComponent(routerInstall, () => {
      console.warn = jest.fn()
      useRoute('Item')
      expect(console.warn).toBeCalled()
    })
  })
})
