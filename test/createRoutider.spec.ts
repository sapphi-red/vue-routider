import { createMemoryHistory, Router } from 'vue-router'
import { createRoutider, createPath } from '#/index'
import { isSameType } from '#/test-util'
import { defineComponent, createApp } from 'vue'
import { mount } from '@vue/test-utils'

type NeverRecord = Record<never, never>

const Com = defineComponent({
  template: '<div></div>'
})

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
  const { router: routerInstall, useRoute, useRouter } = createRoutider({
    history: createMemoryHistory(),
    routes: {
      Index: {
        path: '/',
        component: Com
      },
      Item: {
        path: createPath`/items/${'id'}`,
        component: Com
      },
      UserItem: {
        path: createPath`/users/${'userId'}/${'id'}`,
        component: Com
      },
      About: {
        path: createPath`/`,
        component: Com
      }
    }
  })

  const app = createApp(Com)
  app.use(routerInstall)

  runInsideComponent(routerInstall, () => {
    const router = useRouter()

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

  it('has typed route (1)', () => {
    runInsideComponent(routerInstall, () => {
      const router = useRouter()
      router.push({ name: 'Item', params: { id: '1' } })

      const route = useRoute('Item')
      isSameType<{ id: string }, typeof route.params>(true)
    })
  })

  it('has typed route (2)', () => {
    runInsideComponent(routerInstall, () => {
      const router = useRouter()
      router.push({ name: 'UserItem', params: { id: '1', userId: '1' } })

      const route = useRoute('UserItem')
      isSameType<{ userId: string; id: string }, typeof route.params>(true)
    })
  })

  it('has typed route (3)', () => {
    runInsideComponent(routerInstall, () => {
      const router = useRouter()
      router.push({ name: 'Index' })

      const route = useRoute('Index')
      isSameType<NeverRecord, typeof route.params>(true)
    })
  })

  it('has typed route (4)', () => {
    runInsideComponent(routerInstall, () => {
      const router = useRouter()
      router.push({ name: 'About' })

      const route = useRoute('About')
      isSameType<NeverRecord, typeof route.params>(true)
    })
  })

  it('has intersection and union typed route', () => {
    runInsideComponent(routerInstall, () => {
      const router = useRouter()
      router.push({ name: 'Item', params: { id: '1' } })

      const route = useRoute(['Item', 'UserItem'])
      isSameType<{ userId?: string; id: string }, typeof route.params>(true)
    })
  })
  it('has union typed route', () => {
    runInsideComponent(routerInstall, () => {
      const router = useRouter()
      router.push({ name: 'About' })

      const route = useRoute(['Item', 'UserItem', 'About'])
      isSameType<{ userId?: string; id?: string }, typeof route.params>(true)
    })
  })
  it('has intersection typed route', () => {
    runInsideComponent(routerInstall, () => {
      const router = useRouter()
      router.push({ name: 'Index' })

      const route = useRoute(['Index', 'About'])
      isSameType<NeverRecord, typeof route.params>(true)
    })
  })

  it('has untyped route', () => {
    runInsideComponent(routerInstall, () => {
      const router = useRouter()
      router.push({ name: 'Index' })

      const route = useRoute(null)

      isSameType<Record<string, string | undefined>, typeof route.params>(true)
    })
  })
})
