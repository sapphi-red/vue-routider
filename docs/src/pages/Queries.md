# Queries

By default Vue Routider assumes that every route does not receive any query parameters.

So it will be like below.
```ts
// inside component

const route = useRoute('Item')
// here type of `route.query` will become `Record<never, LocationQueryValue>`
```

To declare a route receives query paramters, use `query` property with `createQueries` like below.
```ts:l=7
const { useRoute } = createRoutider({
  history: /* something */,
  routes: {
    Search: {
      path: '/search',
      component: /* something */,
      query: createQueries('text', 'order', 'until')
    }
  }
})
```

This will only do type checking.
(There is no runtime checking.)

If it is declared like above, it will be like below.
```ts
// inside component

const route = useRoute('Search')
// here type of `route.query` will become `Record<'text' | 'order' | 'until', LocationQueryValue>`
```
