# Vue Routider

[![npm version](https://badge.fury.io/js/vue-routider.svg)](https://badge.fury.io/js/vue-routider)
![CI](https://github.com/sapphi-red/vue-routider/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/sapphi-red/vue-routider/branch/master/graph/badge.svg)](https://codecov.io/gh/sapphi-red/vue-routider)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=sapphi-red/vue-routider)](https://dependabot.com)
[![bundlephobia](https://badgen.net/bundlephobia/min/vue-routider)](https://bundlephobia.com/result?p=vue-routider)
[![bundlephobia](https://badgen.net/bundlephobia/minzip/vue-routider)](https://bundlephobia.com/result?p=vue-routider)

Make vue-router type safe.
(Not compatible with vue-router@3)

## Installation
```shell
$ npm i vue@next vue-router@next vue-routider
```

## Example
`main.ts`
```typescript
import { createApp } from 'vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

`router/index.ts`
```typescript
import { createWebHistory } from 'vue-router'
import { createRoutider, createPath, createPaths } from 'vue-routider'

const { router, useRouter, useRoute } = createRoutider({
  history: createWebHistory(),
  routes: {
    Index: {
      path: '/' // use can just pass a string when it does not include params
    },
    Item: {
      path: createPath`/items/${'id'}`
    },
    UserItem: {
      path: createPath`/users/${'userId'}/${'id'}`
    },
    Users: {
      path: createPaths(
        createPath`/users/${'id'}`,
        createPath`/u/${'id'}`
      ) // use createPaths for alias paths (you can use a array if it does not include params)
    }
  }
})

export default router
export { useRouter, useRoute }
```

`pages/Item.vue`
```typescript
import { defineComponent } from 'vue'
import { useRoute } from '../router'

export default defineComponent({
  setup() {
    const route = useRoute('Item')
    /*
      here type of `route.params` will become `{ id: string }`
    */
  }
})
```

`pages/Base.vue`
```typescript
import { defineComponent } from 'vue'
import { useRoute } from '../router'

export default defineComponent({
  setup() {
    const route = useRoute(['Item', 'UserItem'])
    /*
      here type of `route.params` will become `{ id: string, userId?: string }`
    */
  }
})
```
