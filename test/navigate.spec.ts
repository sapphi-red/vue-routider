/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  waitNavigation,
  getSkeletonRouter,
  runInsideComponent
} from '#/test-util'

describe('router.push', () => {
  it('has typed router.push (1)', async () => {
    const { routerInstall, useRouter, useRoute } = await getSkeletonRouter()
    await runInsideComponent(routerInstall, async () => {
      const router = useRouter()
      router.push({ name: 'About' })

      const route = useRoute(null)
      await waitNavigation(router)
      expect(route.path).toBe('/about')
    })
  })
  it('has typed router.push (2)', async () => {
    const { routerInstall, useRouter, useRoute } = await getSkeletonRouter(
      '/about'
    )
    await runInsideComponent(routerInstall, async () => {
      const router = useRouter()
      router.push({ name: 'Index' })

      const route = useRoute(null)
      await waitNavigation(router)
      expect(route.path).toBe('/')
    })
  })
  it('has typed router.push (3)', async () => {
    const { routerInstall, useRouter, useRoute } = await getSkeletonRouter()
    await runInsideComponent(routerInstall, async () => {
      const router = useRouter()
      router.push({ name: 'Item', params: { id: '1' } })

      const route = useRoute(null)
      await waitNavigation(router)
      expect(route.path).toBe('/items/1')
    })
  })
  it('has typed router.push (4)', async () => {
    const { routerInstall, useRouter, useRoute } = await getSkeletonRouter()
    await runInsideComponent(routerInstall, async () => {
      const router = useRouter()
      router.push({ name: 'UserItemDetail', params: { id: '1', userId: '1' } })

      const route = useRoute(null)
      await waitNavigation(router)
      expect(route.path).toBe('/users/1/1/detail')
    })
  })
  it('has typed router.push (5)', async () => {
    const { routerInstall, useRouter, useRoute } = await getSkeletonRouter()
    await runInsideComponent(routerInstall, async () => {
      const router = useRouter()
      router.push({ name: 'User', params: { userId: '1' } })

      const route = useRoute(null)
      await waitNavigation(router)
      expect(route.path).toBe('/users/1')
    })
  })
  it('has typed router.push (6)', async () => {
    const { routerInstall, useRouter, useRoute } = await getSkeletonRouter()
    await runInsideComponent(routerInstall, async () => {
      const router = useRouter()
      router.push({ name: 'UserItem', params: { userId: '1', id: '1' } })

      const route = useRoute(null)
      await waitNavigation(router)
      expect(route.path).toBe('/users/1/1')
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

  it('should not accept invalid route (1)', async () => {
    const { routerInstall, useRouter } = await getSkeletonRouter()
    await runInsideComponent(routerInstall, () => {
      const router = useRouter()
      try {
        // @ts-expect-error
        router.push({ name: 'Item' })
      } catch {
        expect(true).toBe(true)
      }
    })
  })
  it('should not accept invalid route (2)', async () => {
    const { routerInstall, useRouter } = await getSkeletonRouter()
    await runInsideComponent(routerInstall, () => {
      const router = useRouter()
      try {
        // @ts-expect-error
        router.push({ name: 'UserItem', params: { id: '1' } })
      } catch {
        expect(true).toBe(true)
      }
    })
  })
  it('should not accept invalid route (3)', async () => {
    const { routerInstall, useRouter } = await getSkeletonRouter()
    await runInsideComponent(routerInstall, () => {
      const router = useRouter()
      try {
        // @ts-expect-error
        router.push({ name: 'Invalid' })
      } catch {
        expect(true).toBe(true)
      }
    })
  })
  it('should not accept invalid route (4)', async () => {
    const { routerInstall, useRouter } = await getSkeletonRouter()
    await runInsideComponent(routerInstall, () => {
      const router = useRouter()

      console.warn = jest.fn()
      // @ts-expect-error
      router.push('invalid')
      expect(console.warn).toBeCalled()
    })
  })
})

describe('router.replace', () => {
  it('has typed router.replace (1)', async () => {
    const { routerInstall, useRouter, useRoute } = await getSkeletonRouter()
    await runInsideComponent(routerInstall, async () => {
      const router = useRouter()
      router.replace({ name: 'About' })

      const route = useRoute(null)
      await waitNavigation(router)
      expect(route.path).toBe('/about')
    })
  })
  it('has typed router.replace (2)', async () => {
    const { routerInstall, useRouter, useRoute } = await getSkeletonRouter(
      '/about'
    )
    await runInsideComponent(routerInstall, async () => {
      const router = useRouter()
      router.replace({ name: 'Index' })

      const route = useRoute(null)
      await waitNavigation(router)
      expect(route.path).toBe('/')
    })
  })
  it('has typed router.replace (3)', async () => {
    const { routerInstall, useRouter, useRoute } = await getSkeletonRouter()
    await runInsideComponent(routerInstall, async () => {
      const router = useRouter()
      router.replace({ name: 'Item', params: { id: '1' } })

      const route = useRoute(null)
      await waitNavigation(router)
      expect(route.path).toBe('/items/1')
    })
  })
  it('has typed router.replace (4)', async () => {
    const { routerInstall, useRouter, useRoute } = await getSkeletonRouter()
    await runInsideComponent(routerInstall, async () => {
      const router = useRouter()
      router.replace({
        name: 'UserItemDetail',
        params: { id: '1', userId: '1' }
      })

      const route = useRoute(null)
      await waitNavigation(router)
      expect(route.path).toBe('/users/1/1/detail')
    })
  })
  it('has typed router.replace (5)', async () => {
    const { routerInstall, useRouter, useRoute } = await getSkeletonRouter()
    await runInsideComponent(routerInstall, async () => {
      const router = useRouter()
      router.replace({ name: 'User', params: { userId: '1' } })

      const route = useRoute(null)
      await waitNavigation(router)
      expect(route.path).toBe('/users/1')
    })
  })
  it('has typed router.replace (6)', async () => {
    const { routerInstall, useRouter, useRoute } = await getSkeletonRouter()
    await runInsideComponent(routerInstall, async () => {
      const router = useRouter()
      router.replace({ name: 'UserItem', params: { userId: '1', id: '1' } })

      const route = useRoute(null)
      await waitNavigation(router)
      expect(route.path).toBe('/users/1/1')
    })
  })
  it('can accept genetic route with router.replace', async () => {
    const { routerInstall, useRouter } = await getSkeletonRouter()
    await runInsideComponent(routerInstall, () => {
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

  it('should not accept invalid route (1)', async () => {
    const { routerInstall, useRouter } = await getSkeletonRouter()
    await runInsideComponent(routerInstall, () => {
      const router = useRouter()
      try {
        // @ts-expect-error
        router.replace({ name: 'Item' })
      } catch {
        expect(true).toBe(true)
      }
    })
  })
  it('should not accept invalid route (2)', async () => {
    const { routerInstall, useRouter } = await getSkeletonRouter()
    await runInsideComponent(routerInstall, () => {
      const router = useRouter()
      try {
        // @ts-expect-error
        router.replace({ name: 'UserItem', params: { id: '1' } })
      } catch {
        expect(true).toBe(true)
      }
    })
  })
  it('should not accept invalid route (3)', async () => {
    const { routerInstall, useRouter } = await getSkeletonRouter()
    await runInsideComponent(routerInstall, () => {
      const router = useRouter()
      try {
        // @ts-expect-error
        router.replace({ name: 'Invalid' })
      } catch {
        expect(true).toBe(true)
      }
    })
  })
  it('should not accept invalid route (4)', async () => {
    const { routerInstall, useRouter } = await getSkeletonRouter()
    await runInsideComponent(routerInstall, () => {
      const router = useRouter()

      console.warn = jest.fn()
      // @ts-expect-error
      router.replace('invalid')
      expect(console.warn).toBeCalled()
    })
  })
})
