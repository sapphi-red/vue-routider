import { NavigationFailure, createMemoryHistory, Router } from 'vue-router'
import { Equal, Same, IsNotAnyOrUndefined } from './type'
import { defineComponent } from 'vue'
import { RoutiderRouter, createRoutider, createPath } from '.'
import { mount } from '@vue/test-utils'
import { createQueries } from './options/queries'

export const isTypeEqual = <Left, Right>(
  shouldBeEqual: Equal<Left, Right>
): void => {
  void shouldBeEqual
  expect(true).toBe(true)
}

export const isSameType = <Left, Right>(
  shouldBeEqual: IsNotAnyOrUndefined<Left> extends true
    ? IsNotAnyOrUndefined<Right> extends true
      ? Same<Left, Right> extends true
        ? Same<Required<Left>, Required<Right>> // check optional properties
        : false
      : false
    : false
): void => {
  void shouldBeEqual
  expect(true).toBe(true)
}

export const isSubType = <SuperType, SubType>(
  shouldBeEqual: SubType extends SuperType ? true : false
): void => {
  void shouldBeEqual
  expect(true).toBe(true)
}

// https://github.com/vuejs/vue-test-utils-next/issues/152#issuecomment-653736984
export const waitNavigation = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  router: RoutiderRouter<any>,
  allowRejection = false
): Promise<void | NavigationFailure | undefined> => {
  return new Promise<void | NavigationFailure | undefined>(
    (resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      let removeError = () => {}
      if (!allowRejection) {
        removeError = router.onError(err => {
          removeError()
          removeAfterEach()
          reject(err)
        })
      }
      const removeAfterEach = router.afterEach((_to, _from, failure) => {
        removeError()
        removeAfterEach()
        resolve(failure)
      })
    }
  )
}

export const getSkeletonRouter = async (
  initPath = '/'
): Promise<{ routerInstall: Router } & typeof obj> => {
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
      Item: {
        path: createPath`/items/${'id'}`,
        component: Com,
        props: to => {
          return { id: to.params.id }
        },
        query: createQueries('order', 'row'),
        children: {
          ItemDetail: {
            path: '/detail',
            component: Com
          }
        }
      },
      UserItemDetail: {
        path: createPath`/users/${'userId'}/${'id'}/detail`,
        component: Com,
        query: createQueries('order')
      },
      Users: {
        path: '/users',
        component: Com,
        children: {
          User: {
            path: createPath`${'userId'}`,
            component: Com,
            children: {
              UserDetail: {
                path: 'detail',
                component: Com
              },
              UserItem: {
                path: createPath`${'id'}`,
                component: Com
              }
            }
          }
        }
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

export const runInsideComponent = (
  routerInstall: Router,
  func: () => unknown
): void => {
  const Com = defineComponent({
    template: '<div></div>',
    setup() {
      func()
      return {}
    }
  })
  mount(Com, { global: { plugins: [routerInstall] } })
}
