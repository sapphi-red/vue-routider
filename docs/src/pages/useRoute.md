# useRoute

In this page it will be written as if routes are defined like below.
```ts
const { useRoute } = createRoutider({
  history: /* something */,
  routes: {
    About: {
      path: '/about',
      component: /* something */
    },
    Item: {
      path: createPath`/items/${'id'}`,
      component: /* something */
    },
    UserItem: {
      path: createPath`/users/${'userId'}/${'id'}`,
      component: /* something */
    }
  }
})
```

## `useRoute(routeName)`
This is simillar to [`router.isRouteName(route, routeName)`](/route-type-guards).
```ts:f=router/index.ts
// inside component

const route = useRoute('Item')
// here type of `route.params` will become `{ id: string | string[] }`
```
Calling this function when the path does not match the `routeName` argument(cf. when `routeName` is `Item` and the path is `/about`),
it will output a warning if it is running in development environment(`NODE_ENV`).

## `useRoute([routeName1, routeName2, ...])`
```ts:f=router/index.ts
// inside component

const route = useRoute(['Item', 'UserItem'])
// here type of `route.params` will become `{ id: string | string[], userId?: string | string[] }`
```
Calling this function when the path does not match any of the `routeName` argument(cf. when `routeName` is `Item` and `UserItem`, and the path is `/users/:userId`),
it will output a warning if it is running in development environment(`NODE_ENV`).

## `useRoute(null)`
This is simillar to [`router.getOptionalTypedRoute(route)`](/route-type-guards).
```ts:f=router/index.ts
// inside component

const route = useRoute(null)
// here type of `route.params` will become `{ id?: string | string[], userId?: string | string[] }`
```
