import { createMemoryHistory } from 'vue-router'
import { createRoutider, createPath } from '#/index'

type Equal<Left, Right> = (<U>() => U extends Left ? 1 : 0) extends <
  U
>() => U extends Right ? 1 : 0
  ? true
  : false

const isTypeEqual = <Left, Right>(shouldBeEqual: Equal<Left, Right>) => {
  void shouldBeEqual
  expect(true).toBe(true)
}

describe('createRoutider', () => {
  const { useRoute } = createRoutider({
    history: createMemoryHistory(),
    routes: {
      Item: {
        path: createPath`/items/${'id'}`
      },
      UserItem: {
        path: createPath`/users/${'userId'}/${'itemId'}`
      }
    }
  })

  it('has typed routes (1)', () => {
    const route = useRoute('Item')

    isTypeEqual<{ id: string }, typeof route.params>(true)
  })

  it('has typed routes (2)', () => {
    const route = useRoute('UserItem')

    isTypeEqual<{ userId: string; itemId: string }, typeof route.params>(true)
  })
})
