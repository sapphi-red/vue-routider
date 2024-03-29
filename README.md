# Vue Routider

[![npm version](https://badge.fury.io/js/vue-routider.svg)](https://badge.fury.io/js/vue-routider)
![CI (main)](https://github.com/sapphi-red/vue-routider/workflows/CI%20(main)/badge.svg)
![CI (docs)](https://github.com/sapphi-red/vue-routider/workflows/CI%20(docs)/badge.svg)
[![codecov](https://codecov.io/gh/sapphi-red/vue-routider/branch/master/graph/badge.svg)](https://codecov.io/gh/sapphi-red/vue-routider)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=sapphi-red/vue-routider)](https://dependabot.com)
[![bundlephobia](https://badgen.net/bundlephobia/min/vue-routider)](https://bundlephobia.com/result?p=vue-routider)
[![bundlephobia](https://badgen.net/bundlephobia/minzip/vue-routider)](https://bundlephobia.com/result?p=vue-routider)

Make Vue Router type safe with a very similar API.
(Not compatible with vue-router@3)

[Documents](https://vue-routider.sapphi.red/)

> ⚠️ Because vue-router now provides a official type safe solution([unplugin-vue-router](https://github.com/posva/unplugin-vue-router)). This repository is no longer maintained.

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
      path: '/', // use can just pass a string when it does not include params
      component: /* something */
    },
    // nested routes are supported
    Items: {
      path: '/items',
      component: /* something */,
      children: {
        Item: {
          path: createPath`${'id'}`,
          component: /* something */,
          children: {
            ItemDetail: {
              path: '/detail',
              component: /* something */
            }
          }
        }
      }
    },
    UserItem: {
      path: createPath`/users/${'userId'}/${'id'}`,
      component: /* something */
    },
    Users: {
      // use createPaths for alias paths (you can use an array if it does not include params)
      path: createPaths(
        createPath`/users/${'id'}`,
        createPath`/u/${'id'}`
      ),
      component: /* something */
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
    // here type of `route.params` will become `{ id: string | string[] }`
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
    // here type of `route.params` will become `{ id: string | string[], userId?: string | string[] }`
  }
})
```
