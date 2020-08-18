# Introduction

Vue Routider is a slim wrapper for [Vue Router][].  
It makes Vue Router type safe and has a very similar API.  
  
We pass a object which has a key of route name and a value of route
with Vue Routider while Vue Router requires an array of routes.

```ts:f=router/index.ts
import { createWebHistory } from 'vue-router'
import { createRoutider, createPath, createPaths } from 'vue-routider'

const { router, useRouter, useRoute } = createRoutider({
  history: createWebHistory(),
  routes: {
    Index: {
      path: '/', // use can just pass a string when it does not include params
      component: /* something */
    },
    Item: {
      path: createPath`/items/${'id'}`,
      component: /* something */
    },
    UserItem: {
      path: createPath`/users/${'userId'}/${'id'}`,
      component: /* something */
    },
    Users: {
      path: createPaths(
        createPath`/users/${'id'}`,
        createPath`/u/${'id'}`
      ), // use createPaths for alias paths (you can use a array if it does not include params)
      component: /* something */
    }
  }
})

export default router
export { useRouter, useRoute }
```

```ts:f=pages/Item.vue
import { defineComponent } from 'vue'
import { useRoute } from '../router'

export default defineComponent({
  setup() {
    const route = useRoute('Item')
    /*
     * here type of `route.params` will become `{ id: string | string[] }`
     */
  }
})
```

[Vue Router]: https://router.vuejs.org/
