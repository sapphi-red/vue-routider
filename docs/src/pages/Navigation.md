# Navigation

Vue Routider has no `<router-link>` implemention. (See [limitations](/limitations).)

## `router.push(location, onComplete, onAbort?)`

Vue Routider restricts navigating with path string.

```ts
// For example, if the route 'user' is defined like `/users/:userId`

router.push({ name: 'user', params: { userId: '123' } }) // this will be ok
router.push({ name: 'user' }) // this will fail type check
router.push({ name: 'user', params: { id: '123' } }) // also this will fail type check
```

## `router.replace(location, onComplete?, onAbort?)`

The difference with Vue Router is the same with `router.push`.
