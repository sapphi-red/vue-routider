<template>
  <div class="routes">
    <a class="link" @click="moveTo({ name: routeNames[0] })">{{
      routeNames[0].replace(/[A-Z]/g, m => ` ${m}`).slice(1)
    }}</a>
    <template v-for="name in routeNames.slice(1)">
      <span :key="name"> | </span>
      <a :key="name" class="link" @click="moveTo({ name })">{{
        name.replace(/[A-Z]/g, m => ` ${m}`).slice(1)
      }}</a>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouteNames, RoutiderRouteLocation } from 'vue-routider'
import { routes, Routes, useRouter } from '/@/router'

const routeNames = Object.keys(routes) as Array<RouteNames<Routes>>

export default defineComponent({
  name: 'Routes',
  setup() {
    const router = useRouter()

    const moveTo = <N extends RouteNames<Routes>>(
      to: RoutiderRouteLocation<Routes, N>
    ) => {
      router.push(to)
    }

    return { routeNames, moveTo }
  }
})
</script>

<style scoped>
.routes {
  text-align: center;
}

.link {
  cursor: pointer;
}
.link:hover {
  text-decoration: underline;
}
</style>
