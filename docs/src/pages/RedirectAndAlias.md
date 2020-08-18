# Redirect and Alias

## Redirect

With Vue Router we wrote like below in `routes` for redirecting.
```ts:l=3
{
  path: '/a',
  redirect: '/b'
}
```

With Vue Routider we write like this.
```ts:l=4,5,6,7,8,9
const routes = {
  // createRoute is necessary for correct type inference
  Desc: createRoute({
    path: '/a',
    redirect: to => {
      // `: unknown` is necessary here for avoiding circular type inference
      // use `ensureLocationType` to only accept valid routes
      const newTo: unknown = ensureLocationType({ name: 'About' })
      return newTo
    }
  })
}

const { ensureLocationType } = createRoutider({
  history: /* something */,
  routes
})
```

## Alias Routes

With Vue Router we wrote like below to create aliases.
```ts:l=4
{
  path: '/user/:id',
  component: /* something */,
  alias: '/u/:id'
}
```
```ts:l=4
{
  path: '/a',
  component: /* something */,
  alias: ['/b', '/c']
}
```

With Vue Routider we write like this.
```ts:l=3,4
{
  path: createPaths(
    createPath`/user/${'id'}`,
    createPath`/u/${'id'}`
  ),
  component: /* something */
}
```
```ts:l=2
{
  path: ['/a', '/b', '/c'],
  component: /* something */
}
```

If you write incorrect aliases like below, type check will fail and tell you.
```ts:l=3,4
{
  path: createPaths(
    createPath`/user/${'id'}`,
    createPath`/u/${'userId'}` // should be 'createPath`u/${'id'}`'
  ),
  component: /* something */
}
```
