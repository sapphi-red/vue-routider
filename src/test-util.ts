import { Equal } from './type'

export const isTypeEqual = <Left, Right>(
  shouldBeEqual: Equal<Left, Right>
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
