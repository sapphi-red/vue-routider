/* eslint-disable @typescript-eslint/ban-ts-comment */
import { isSameType, getSkeletonRouter, runInsideComponent } from '#/test-util'
import { QueryMap } from '#/options/queries'

type NeverRecord = Record<never, never>

describe('useRoute', () => {
  it('has typed route (1)', async () => {
    const { routerInstall, useRoute } = await getSkeletonRouter('/items/1')
    runInsideComponent(routerInstall, () => {
      const route = useRoute('Item')
      isSameType<{ id: string | string[] }, typeof route.params>(true)
      isSameType<QueryMap<'order' | 'row'>, typeof route.query>(true)
    })
  })
  it('has typed route (2)', async () => {
    const { routerInstall, useRoute } = await getSkeletonRouter('/users/1/1')
    runInsideComponent(routerInstall, () => {
      const route = useRoute('UserItemDetail')
      isSameType<
        { userId: string | string[]; id: string | string[] },
        typeof route.params
      >(true)
      isSameType<QueryMap<'order'>, typeof route.query>(true)
    })
  })
  it('has typed route (3)', async () => {
    const { routerInstall, useRoute } = await getSkeletonRouter('/')
    runInsideComponent(routerInstall, () => {
      const route = useRoute('Index')
      isSameType<NeverRecord, typeof route.params>(true)
      isSameType<NeverRecord, typeof route.query>(true)
    })
  })
  it('has typed route (4)', async () => {
    const { routerInstall, useRoute } = await getSkeletonRouter('/about')
    runInsideComponent(routerInstall, () => {
      const route = useRoute('About')
      isSameType<NeverRecord, typeof route.params>(true)
      isSameType<NeverRecord, typeof route.query>(true)
    })
  })
  it('has typed route (5)', async () => {
    const { routerInstall, useRoute } = await getSkeletonRouter('/about')
    runInsideComponent(routerInstall, () => {
      const route = useRoute('UserItem')
      isSameType<
        { id: string | string[]; userId: string | string[] },
        typeof route.params
      >(true)
      isSameType<NeverRecord, typeof route.query>(true)
    })
  })
  it('has typed route (6)', async () => {
    const { routerInstall, useRoute } = await getSkeletonRouter('/about')
    runInsideComponent(routerInstall, () => {
      const route = useRoute('UserDetail')
      isSameType<{ userId: string | string[] }, typeof route.params>(true)
      isSameType<NeverRecord, typeof route.query>(true)
    })
  })

  it('has intersection and union typed route', async () => {
    const { routerInstall, useRoute } = await getSkeletonRouter('/items/1')
    runInsideComponent(routerInstall, () => {
      const route = useRoute(['Item', 'UserItem'])
      isSameType<
        { userId?: string | string[]; id: string | string[] },
        typeof route.params
      >(true)
      isSameType<QueryMap<'order' | 'row'>, typeof route.query>(true)
    })
  })
  it('has union typed route', async () => {
    const { routerInstall, useRoute } = await getSkeletonRouter('/about')
    runInsideComponent(routerInstall, () => {
      const route = useRoute(['Item', 'UserItem', 'About'])
      isSameType<
        { userId?: string | string[]; id?: string | string[] },
        typeof route.params
      >(true)
      isSameType<QueryMap<'order' | 'row'>, typeof route.query>(true)
    })
  })
  it('has intersection typed route', async () => {
    const { routerInstall, useRoute } = await getSkeletonRouter('/')
    runInsideComponent(routerInstall, () => {
      const route = useRoute(['Index', 'About'])
      isSameType<NeverRecord, typeof route.params>(true)
      isSameType<NeverRecord, typeof route.query>(true)
    })
  })

  it('has untyped route', async () => {
    const { routerInstall, useRoute } = await getSkeletonRouter('/')
    runInsideComponent(routerInstall, () => {
      const route = useRoute(null)
      isSameType<
        Record<string, string | string[] | undefined>,
        typeof route.params
      >(true)
      isSameType<QueryMap<string>, typeof route.query>(true)
    })
  })

  it('warns if useRoute is called in incorrect path', async () => {
    const { routerInstall, useRoute } = await getSkeletonRouter('/')
    runInsideComponent(routerInstall, () => {
      console.warn = jest.fn()
      useRoute('Item')
      expect(console.warn).toBeCalled()
    })
  })

  it('should not accept invalid route (1)', async () => {
    const { routerInstall, useRoute } = await getSkeletonRouter('/about')
    runInsideComponent(routerInstall, () => {
      // @ts-expect-error
      useRoute('Invalid')
      expect(true).toBe(true)
    })
  })
  it('should not accept invalid route (2)', async () => {
    const { routerInstall, useRoute } = await getSkeletonRouter('/about')
    runInsideComponent(routerInstall, () => {
      // @ts-expect-error
      useRoute({ name: 'Invalid' })
      expect(true).toBe(true)
    })
  })
  it('should not accept invalid route (3)', async () => {
    const { routerInstall, useRoute } = await getSkeletonRouter('/about')
    runInsideComponent(routerInstall, () => {
      // @ts-expect-error
      useRoute()
      expect(true).toBe(true)
    })
  })
})
