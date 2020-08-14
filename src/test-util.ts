import { NavigationFailure } from 'vue-router'
import { Equal, Same, IsNotAnyOrUndefined } from './type'
import { RoutiderRouter } from './router/router'

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
      const removeAfterEach = router.afterEach(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (_to: any, _from: any, failure: any) => {
          removeError()
          removeAfterEach()
          resolve(failure)
        }
      )
    }
  )
}
