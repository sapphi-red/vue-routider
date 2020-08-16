# Route Matching

With Vue Router we set a string to path property like below.

```ts
'/' // static route
'/items/:id' // dynamic route with `id` param
```

With Vue Routider we pass a template string to `createPath` function.
```ts
createPath`/`
createPath`/items/${'id'}` // enclosing in '${' and '}' tells it is a param
```

If it is a static route (which does not have any params),
you can use a simple string as same as used in Vue Router.
For example, the two below works same.
```ts:l=2
{
  path: '/',
  component: /* something */
}
```
```ts:l=2
{
  path: createPath`/`,
  component: /* something */
}
```
