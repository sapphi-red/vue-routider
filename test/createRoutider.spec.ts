import { createMemoryHistory, Router } from 'vue-router'
import { createRoutider, createPath, ValidTypeLocation } from '#/index'
import { isSameType, waitNavigation, isTypeEqual, isSubType } from '#/test-util'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { createRoute } from '#/route/route'

type NeverRecord = Record<never, never>

const getRouter = async (initPath = '/') => {
  const Com = defineComponent({
    template: '<div></div>'
  })

  const obj = createRoutider({
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
  obj.rawRouter.push(initPath)
  await obj.rawRouter.isReady()
  const routerInstall = obj.router
  return { routerInstall, ...obj }
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
      isSameType<{ id: string | string[] }, typeof route.params>(true)
    })
  })
  it('has typed route (2)', async () => {
    const { routerInstall, useRoute } = await getRouter('/users/1/1')
    runInsideComponent(routerInstall, () => {
      const route = useRoute('UserItem')
      isSameType<
        { userId: string | string[]; id: string | string[] },
        typeof route.params
      >(true)
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
      isSameType<
        { userId?: string | string[]; id: string | string[] },
        typeof route.params
      >(true)
    })
  })
  it('has union typed route', async () => {
    const { routerInstall, useRoute } = await getRouter('/about')
    runInsideComponent(routerInstall, () => {
      const route = useRoute(['Item', 'UserItem', 'About'])
      isSameType<
        { userId?: string | string[]; id?: string | string[] },
        typeof route.params
      >(true)
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
      isSameType<
        Record<string, string | string[] | undefined>,
        typeof route.params
      >(true)
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

  it('has no any or undefined param for beforeEach', async () => {
    const { routerInstall, useRouter } = await getRouter()
    runInsideComponent(routerInstall, () => {
      const router = useRouter()
      type BeforeEachParams = Parameters<
        Parameters<typeof router.beforeEach>[0]
      >
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      isTypeEqual<BeforeEachParams[0], any>(false)
      isTypeEqual<BeforeEachParams[0], undefined>(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      isTypeEqual<BeforeEachParams[1], any>(false)
      isTypeEqual<BeforeEachParams[1], undefined>(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      isTypeEqual<BeforeEachParams[2], any>(false)
      isTypeEqual<BeforeEachParams[2], undefined>(false)
    })
  })
  it('has no any or undefined param for beforeResolve', async () => {
    const { routerInstall, useRouter } = await getRouter()
    runInsideComponent(routerInstall, () => {
      const router = useRouter()
      type BeforeResolveParams = Parameters<
        Parameters<typeof router.beforeResolve>[0]
      >
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      isTypeEqual<BeforeResolveParams[0], any>(false)
      isTypeEqual<BeforeResolveParams[0], undefined>(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      isTypeEqual<BeforeResolveParams[1], any>(false)
      isTypeEqual<BeforeResolveParams[1], undefined>(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      isTypeEqual<BeforeResolveParams[2], any>(false)
      isTypeEqual<BeforeResolveParams[2], undefined>(false)
    })
  })
  it('has no any or undefined param for afterEach', async () => {
    const { routerInstall, useRouter } = await getRouter()
    runInsideComponent(routerInstall, () => {
      const router = useRouter()
      type AfterEachParams = Parameters<Parameters<typeof router.afterEach>[0]>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      isTypeEqual<AfterEachParams[0], any>(false)
      isTypeEqual<AfterEachParams[0], undefined>(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      isTypeEqual<AfterEachParams[1], any>(false)
      isTypeEqual<AfterEachParams[1], undefined>(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      isTypeEqual<AfterEachParams[2], any>(false)
      isTypeEqual<AfterEachParams[2], undefined>(false)
    })
  })

  it('has no any or undefined param for onBeforeRouteLeave', async () => {
    const { onBeforeRouteLeave } = await getRouter()
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onBeforeRouteLeave(() => {})

    type onBeforeRouteLeaveParams = Parameters<
      Parameters<typeof onBeforeRouteLeave>[0]
    >
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isTypeEqual<onBeforeRouteLeaveParams[0], any>(false)
    isTypeEqual<onBeforeRouteLeaveParams[0], undefined>(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isTypeEqual<onBeforeRouteLeaveParams[1], any>(false)
    isTypeEqual<onBeforeRouteLeaveParams[1], undefined>(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isTypeEqual<onBeforeRouteLeaveParams[2], any>(false)
    isTypeEqual<onBeforeRouteLeaveParams[2], undefined>(false)
  })
  it('has no any or undefined param for onBeforeRouteUpdate', async () => {
    const { onBeforeRouteUpdate } = await getRouter()
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onBeforeRouteUpdate(() => {})

    type onBeforeRouteUpdateParams = Parameters<
      Parameters<typeof onBeforeRouteUpdate>[0]
    >
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isTypeEqual<onBeforeRouteUpdateParams[0], any>(false)
    isTypeEqual<onBeforeRouteUpdateParams[0], undefined>(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isTypeEqual<onBeforeRouteUpdateParams[1], any>(false)
    isTypeEqual<onBeforeRouteUpdateParams[1], undefined>(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isTypeEqual<onBeforeRouteUpdateParams[2], any>(false)
    isTypeEqual<onBeforeRouteUpdateParams[2], undefined>(false)
  })

  it('can narrow type correctly with isRouteName', async () => {
    const { routerInstall, useRoute, useRouter } = await getRouter()
    runInsideComponent(routerInstall, () => {
      const route = useRoute(null)
      const router = useRouter()

      isSameType<
        Record<string, string | string[] | undefined>,
        typeof route.params
      >(true)
      if (router.isRouteName(route, 'Item')) {
        isSameType<{ id: string | string[] }, typeof route.params>(true)
      }
      if (router.isRouteName(route, 'Index')) {
        isSameType<NeverRecord, typeof route.params>(true)
      }
    })
  })

  it('can get type correctly with getOptionalTypedRoute', async () => {
    const { routerInstall, useRoute, useRouter } = await getRouter('/')
    runInsideComponent(routerInstall, () => {
      const route = useRoute('Index')
      const router = useRouter()

      const optionalTypedRoute = router.getOptionalTypedRoute(route)
      isSameType<
        { id?: string | string[]; userId?: string | string[] },
        typeof optionalTypedRoute.params
      >(true)
    })
  })

  it('can get ValidTypeLocation type by ensureLocationType', async () => {
    const { ensureLocationType } = await getRouter('/')
    const to = ensureLocationType({ name: 'Index' })

    isSubType<ValidTypeLocation, typeof to>(true)
  })
})
