# Route Type Guards

## `router.isRouteName(route, routeName)`
Narrows type of `route` argument if the name of `route` is same with `routeName`.

```ts
const anyRoute: RoutiderLocation<undefined, undefined> = /* route */

if (router.isRouteName(anyRoute, 'Index')) {
  // anyRoute.params will be typed as it is 'Index' route. 
}
```

## `router.getOptionalTypedRoute(route)`
If there were paths like below.

- `/items/:id`
- `/users/:userId/:id`
- `/users/:userId/:id/desc`

`id` param exists in every path and `userId` param exists in some path.
So `router.getOptionalTypedRoute(route).param` will be `{ id: string | string[], userId?: string | string[] }`.
