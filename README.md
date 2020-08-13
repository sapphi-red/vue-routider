# Vue Routider

[![npm version](https://badge.fury.io/js/%40sapphi-red%2Fvue-routider.svg)](https://badge.fury.io/js/%40sapphi-red%2Fvue-routider)
![CI](https://github.com/sapphi-red/vue-routider/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/sapphi-red/vue-routider/branch/master/graph/badge.svg)](https://codecov.io/gh/sapphi-red/vue-routider)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=sapphi-red/vue-routider)](https://dependabot.com)

Make vue-router type safe.
(Not compatible with vue-router@3)

## Installation
```shell
$ npm i vue@next vue-router@next vue-routider
```

## Example
`router/index.ts`
```typescript
import { createWebHistory } from 'vue-router'
import { createRoutider } from 'vue-routider'

const { router, useRouter, useRoute } = createRoutider({
  history: createWebHistory(),
  routes: {
    Item: {
      path: createPath`/items/${'id'}`
    },
    UserItem: {
      path: createPath`/users/${'userId'}/${'itemId'}`
    }
  }
})

export { useRouter, useRoute }
```

`pages/Item.vue`
```typescript
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const route = useRoute('Item')
    /*
      here type of `route.params` will become `{ id: string }`
    */
  }
})
```
