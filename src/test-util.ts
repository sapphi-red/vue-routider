import { Equal, Same, IsNotAnyOrUndefined } from './type'

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
