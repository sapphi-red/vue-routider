import { Equal } from './type'

export const isTypeEqual = <Left, Right>(
  shouldBeEqual: Equal<Left, Right>
): void => {
  void shouldBeEqual
  expect(true).toBe(true)
}
