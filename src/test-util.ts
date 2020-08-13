type Equal<Left, Right> = (<U>() => U extends Left ? 1 : 0) extends <
  U
>() => U extends Right ? 1 : 0
  ? true
  : false

export const isTypeEqual = <Left, Right>(
  shouldBeEqual: Equal<Left, Right>
): void => {
  void shouldBeEqual
  expect(true).toBe(true)
}
