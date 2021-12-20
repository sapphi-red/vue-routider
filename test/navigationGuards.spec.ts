import { isTypeEqual } from '#/test-util'
import { defineComponent } from 'vue'
import { createRoutider } from '#/createRoutider'
import { createMemoryHistory, NavigationFailure } from 'vue-router'
import { createPath } from '#/options/path'
import { mount } from '@vue/test-utils'
import { RoutiderLocationNL } from '#/route/location'
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
  it('should be called and has correct type (beforeEach)', async () => {
    const { routes, router } = await setupRouter()
    type UnknownLocation = RoutiderLocationNL<
      undefined,
      undefined,
      undefined,
      RouteNames<typeof routes>
    >

    return new Promise(resolve => {
      router.beforeEach((to, from, next) => {
        isTypeEqual<typeof to, UnknownLocation>(true)
        isTypeEqual<typeof from, UnknownLocation>(true)
        isTypeEqual<typeof next, RoutiderNavigationGuardNext<typeof routes>>(
          true
        )

        expect(to.name).toBe('Item')
        expect(from.name).toBe('Index')
        next()

        resolve()
      })
      router.push({ name: 'Item', params: { id: '1' } })
    })
  })
  it('should be called and has correct type (beforeResolve)', async () => {
    const { routes, router } = await setupRouter()
    type UnknownLocation = RoutiderLocationNL<
      undefined,
      undefined,
      undefined,
      RouteNames<typeof routes>
    >

    return new Promise(resolve => {
      router.beforeResolve((to, from, next) => {
        isTypeEqual<typeof to, UnknownLocation>(true)
        isTypeEqual<typeof from, UnknownLocation>(true)
        isTypeEqual<typeof next, RoutiderNavigationGuardNext<typeof routes>>(
          true
        )

        expect(to.name).toBe('Item')
        expect(from.name).toBe('Index')
        next()

        resolve()
      })
      router.push({ name: 'Item', params: { id: '1' } })
    })
  })
  it('should be called and has correct type (afterEach)', async () => {
    const { routes, router } = await setupRouter()
    type UnknownLocation = RoutiderLocationNL<
      undefined,
      undefined,
      undefined,
      RouteNames<typeof routes>
    >

    return new Promise(resolve => {
      router.afterEach((to, from, next) => {
        isTypeEqual<typeof to, UnknownLocation>(true)
        isTypeEqual<typeof from, UnknownLocation>(true)
        isTypeEqual<typeof next, undefined | NavigationFailure | void>(true)

        expect(to.name).toBe('Item')
        expect(from.name).toBe('Index')

        resolve()
      })
      router.push({ name: 'Item', params: { id: '1' } })
    })
  })

  it('should be called and has correct type (onBeforeRouteLeave)', done => {
    type UnknownLocation = RoutiderLocationNL<
      undefined,
      undefined,
      undefined,
      RouteNames<Routes>
    >

    const IndexCom = defineComponent({
      template: '<div></div>',
      setup() {
        onBeforeRouteLeave((to, from, next) => {
          isTypeEqual<typeof to, UnknownLocation>(true)
          isTypeEqual<typeof from, UnknownLocation>(true)
          isTypeEqual<typeof next, RoutiderNavigationGuardNext<Routes>>(true)

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
    type Routes = typeof routes

    const { rawRouter, router, onBeforeRouteLeave } = createRoutider({
      history: createMemoryHistory(),
      routes
    })
    rawRouter.push('/')
    rawRouter.isReady().then(() => {
      mount(AppCom, { global: { plugins: [router] } })

      router.push({ name: 'Item', params: { id: '1' } })
    })
  })
  it('should be called and has correct type (onBeforeRouteUpdate)', done => {
    type UnknownLocation = RoutiderLocationNL<
      undefined,
      undefined,
      undefined,
      RouteNames<Routes>
    >

    const ItemCom = defineComponent({
      template: '<div></div>',
      setup() {
        onBeforeRouteUpdate((to, from, next) => {
          isTypeEqual<typeof to, UnknownLocation>(true)
          isTypeEqual<typeof from, UnknownLocation>(true)
          isTypeEqual<typeof next, RoutiderNavigationGuardNext<Routes>>(true)

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
    type Routes = typeof routes

    const { rawRouter, router, onBeforeRouteUpdate } = createRoutider({
      history: createMemoryHistory(),
      routes
    })
    rawRouter.push('/items/1')
    rawRouter.isReady().then(() => {
      mount(AppCom, { global: { plugins: [router] } })

      router.push({ name: 'Item', params: { id: '2' } })
    })
  })
})
