import { isTypeEqual } from '#/test-util'
import { defineComponent } from 'vue'
import { createRoutider } from '#/createRoutider'
import { createMemoryHistory, NavigationFailure } from 'vue-router'
import { createPath } from '#/options/path'
import { mount } from '@vue/test-utils'
import { RoutiderLocation } from '#/route/location'
import { RoutiderNavigationGuardNext } from '#/router/navigationGuard'
import { RouteNames } from '#/options/options'

const AppCom = defineComponent({
  template: '<router-view />'
})
const EmptyCom = defineComponent({
  template: '<div></div>'
})

const setupRouter = async () => {
  const routes = {
    Index: {
      path: '/',
      component: EmptyCom
    },
    Item: {
      path: createPath`/items/${'id'}`,
      component: EmptyCom
    }
  }

  const obj = createRoutider({
    history: createMemoryHistory(),
    routes
  })
  obj.rawRouter.push('/')
  await obj.rawRouter.isReady()
  const routerInstall = obj.router

  mount(AppCom, { global: { plugins: [routerInstall] } })
  return { routes, ...obj }
}

describe('navigationGuards', () => {
  it('should be called and has correct type (beforeEach)', async done => {
    const { routes, router } = await setupRouter()
    type UnknownLocation = RoutiderLocation<
      undefined,
      undefined,
      RouteNames<typeof routes>
    >

    router.beforeEach((to, from, next) => {
      isTypeEqual<typeof to, UnknownLocation>(true)
      isTypeEqual<typeof from, UnknownLocation>(true)
      isTypeEqual<typeof next, RoutiderNavigationGuardNext<typeof routes>>(true)

      expect(to.name).toBe('Item')
      expect(from.name).toBe('Index')
      next()

      done()
    })
    router.push({ name: 'Item', params: { id: '1' } })
  })
  it('should be called and has correct type (beforeResolve)', async done => {
    const { routes, router } = await setupRouter()
    type UnknownLocation = RoutiderLocation<
      undefined,
      undefined,
      RouteNames<typeof routes>
    >

    router.beforeResolve((to, from, next) => {
      isTypeEqual<typeof to, UnknownLocation>(true)
      isTypeEqual<typeof from, UnknownLocation>(true)
      isTypeEqual<typeof next, RoutiderNavigationGuardNext<typeof routes>>(true)

      expect(to.name).toBe('Item')
      expect(from.name).toBe('Index')
      next()

      done()
    })
    router.push({ name: 'Item', params: { id: '1' } })
  })
  it('should be called and has correct type (afterEach)', async done => {
    const { routes, router } = await setupRouter()
    type UnknownLocation = RoutiderLocation<
      undefined,
      undefined,
      RouteNames<typeof routes>
    >

    router.afterEach((to, from, next) => {
      isTypeEqual<typeof to, UnknownLocation>(true)
      isTypeEqual<typeof from, UnknownLocation>(true)
      isTypeEqual<typeof next, undefined | NavigationFailure | void>(true)

      expect(to.name).toBe('Item')
      expect(from.name).toBe('Index')

      done()
    })
    router.push({ name: 'Item', params: { id: '1' } })
  })

  it('should be called and has correct type (onBeforeRouteLeave)', async done => {
    type UnknownLocation = RoutiderLocation<
      undefined,
      undefined,
      RouteNames<typeof routes>
    >

    const IndexCom = defineComponent({
      template: '<div></div>',
      setup() {
        onBeforeRouteLeave((to, from, next) => {
          isTypeEqual<typeof to, UnknownLocation>(true)
          isTypeEqual<typeof from, UnknownLocation>(true)
          isTypeEqual<typeof next, RoutiderNavigationGuardNext<typeof routes>>(
            true
          )

          expect(to.name).toBe('Item')
          expect(from.name).toBe('Index')
          next()

          done()
        })
      }
    })

    const routes = {
      Index: {
        path: '/',
        component: IndexCom
      },
      Item: {
        path: createPath`/items/${'id'}`,
        component: EmptyCom
      }
    }

    const { rawRouter, router, onBeforeRouteLeave } = createRoutider({
      history: createMemoryHistory(),
      routes
    })
    rawRouter.push('/')
    await rawRouter.isReady()
    mount(AppCom, { global: { plugins: [router] } })

    router.push({ name: 'Item', params: { id: '1' } })
  })
  it('should be called and has correct type (onBeforeRouteUpdate)', async done => {
    type UnknownLocation = RoutiderLocation<
      undefined,
      undefined,
      RouteNames<typeof routes>
    >

    const ItemCom = defineComponent({
      template: '<div></div>',
      setup() {
        onBeforeRouteUpdate((to, from, next) => {
          isTypeEqual<typeof to, UnknownLocation>(true)
          isTypeEqual<typeof from, UnknownLocation>(true)
          isTypeEqual<typeof next, RoutiderNavigationGuardNext<typeof routes>>(
            true
          )

          expect(to.name).toBe('Item')
          expect(from.name).toBe('Item')
          next()

          done()
        })
      }
    })

    const routes = {
      Index: {
        path: '/',
        component: EmptyCom
      },
      Item: {
        path: createPath`/items/${'id'}`,
        component: ItemCom
      }
    }

    const { rawRouter, router, onBeforeRouteUpdate } = createRoutider({
      history: createMemoryHistory(),
      routes
    })
    rawRouter.push('/items/1')
    await rawRouter.isReady()
    mount(AppCom, { global: { plugins: [router] } })

    router.push({ name: 'Item', params: { id: '2' } })
  })
})
