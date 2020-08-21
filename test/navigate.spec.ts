import {
  waitNavigation,
  getSkeletonRouter,
  runInsideComponent
} from '#/test-util'

describe('router.push', () => {
  it('has typed router.push (1)', async done => {
    const { routerInstall, useRouter, useRoute } = await getSkeletonRouter()
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
    const { routerInstall, useRouter, useRoute } = await getSkeletonRouter(
      '/about'
    )
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
    const { routerInstall, useRouter, useRoute } = await getSkeletonRouter()
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
    const { routerInstall, useRouter, useRoute } = await getSkeletonRouter()
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
    const { routerInstall, useRouter } = await getSkeletonRouter()
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
})

describe('router.replace', () => {
  it('has typed router.replace (1)', async done => {
    const { routerInstall, useRouter, useRoute } = await getSkeletonRouter()
    runInsideComponent(routerInstall, async () => {
      const router = useRouter()
      router.replace({ name: 'About' })

      const route = useRoute(null)
      await waitNavigation(router)
      expect(route.path).toBe('/about')
      done()
    })
  })
  it('has typed router.replace (2)', async done => {
    const { routerInstall, useRouter, useRoute } = await getSkeletonRouter(
      '/about'
    )
    runInsideComponent(routerInstall, async () => {
      const router = useRouter()
      router.replace({ name: 'Index' })

      const route = useRoute(null)
      await waitNavigation(router)
      expect(route.path).toBe('/')
      done()
    })
  })
  it('has typed router.replace (3)', async done => {
    const { routerInstall, useRouter, useRoute } = await getSkeletonRouter()
    runInsideComponent(routerInstall, async () => {
      const router = useRouter()
      router.replace({ name: 'Item', params: { id: '1' } })

      const route = useRoute(null)
      await waitNavigation(router)
      expect(route.path).toBe('/items/1')
      done()
    })
  })
  it('has typed router.replace (4)', async done => {
    const { routerInstall, useRouter, useRoute } = await getSkeletonRouter()
    runInsideComponent(routerInstall, async () => {
      const router = useRouter()
      router.replace({ name: 'UserItem', params: { id: '1', userId: '1' } })

      const route = useRoute(null)
      await waitNavigation(router)
      expect(route.path).toBe('/users/1/1')
      done()
    })
  })
  it('can accept genetic route with router.replace', async () => {
    const { routerInstall, useRouter } = await getSkeletonRouter()
    runInsideComponent(routerInstall, () => {
      const router = useRouter()
      const rs = [
        { name: 'About' },
        { name: 'Index' },
        { name: 'About', params: { id: '1' } }
      ] as const

      rs.forEach(r => {
        router.replace(r)
      })
    })
  })
})
