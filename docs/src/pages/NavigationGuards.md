# Navigation Guards

## Global Guards and Hooks
Arguments of `router.beforeEach`, `router.beforeResolve`, `router.afterEach` will be like below.

- `to: Route`: Use [route type guards](/route-type-guards) to narrow type
- `from: Route`: Use [route type guards](/route-type-guards) to narrow type
- `next: Function`: Simillar to [`router.push`](/navigation), it would not receive path string like `/items`.

For example, it would be like below.
```ts
const { router } = createRoutider({
  history: /* something */,
  routes: {
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

router.beforeEach((to, from, next) => {
  // here `to.params` would not exist.
  if (router.isRouteName(to, 'Item')) {
    // here `to.params` would be `{ id: string | string[] }`
  }

  const optionalFrom = router.getOptionalTypedRoute(from)
  // `optionalFrom.params` would be `{ id: string | string[], userId?: string | string[] }`
  // because `id` params exists in every route and `userId` only exists in `UserItem` route

  if (optionalFrom.params.id === '1') {
    next({ name: 'Item', params: { id: '3' } })
  } else {
    next(true)
  }
})
```

## Per-Route Guard

You need to use [route type guards](/route-type-guards) for `from` argument as same as Global Guards.
Other things are same with [redirects](/redirect-and-alias).

For example, it would be like below.
```ts
const routes = {
  // createRoute is necessary for correct type inference
  Item: createRoute({
    path: createPath`/items/${'id'}`,
    component: /* something */,
    beforeEnter: (to, from, next) => {
      // here `to.params` would be `{ id: string }`

      if (router.isRouteName(from, 'About')) {
        // here `from.params` would be `{}`
      }

      // use `ensureLocationType` to only accept valid routes (this is necessary, next would not accept `{ name: 'About' }` directly)
      const newTo = ensureLocationType({ name: 'About' })
      next(newTo)
    }
  }),
  About: {
    path: '/about',
    component: /* something */
  }
}

const { router, ensureLocationType } = createRoutider({
  history: /* something */,
  routes
})
```

## In-Component Guards

It is same with Global Guards.

For example, it would be like below.
```ts
const { router, onBeforeRouteLeave } = createRoutider({
  history: /* something */,
  routes: {
    Item: {
      path: createPath`/items/${'id'}`,
      component: /* something */,
    },
    About: {
      path: '/about',
      component: /* something */
    }
  }
})

// inside component
onBeforeRouteLeave((to, from, next) => {
  // here `to.params` would not exist.
  if (router.isRouteName(to, 'Item')) {
    // here `to.params` would be `{ id: string | string[] }`

    if (to.params.id === '1') {
      next({ name: 'Item', params: { id: '3' } })
      return
    }
  }

  const optionalFrom = router.getOptionalTypedRoute(from)
  // `optionalFrom.params` would be `{ id?: string | string[] }`

  next(true)
})
```
