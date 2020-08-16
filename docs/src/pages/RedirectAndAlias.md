# Redirect and Alias

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
