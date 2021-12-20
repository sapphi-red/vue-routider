<template>
  <div class="routes">
    <a class="link" @click="moveTo({ name: routeNames[0] })">{{
      formatRouteName(routeNames[0])
    }}</a>
    <template v-for="name in routeNames.slice(1)" :key="name">
      <span> | </span>
      <a class="link" @click="moveTo({ name })">{{ formatRouteName(name) }}</a>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouteNames, RoutiderRouteLocation } from 'vue-routider'
import { routes, Routes, useRouter } from '/@/router'

const routeNames = Object.keys(routes) as Array<RouteNames<Routes>>
const formatRouteName = (name: string) =>
  /^[A-Z]/.test(name) ? name.replace(/[A-Z]/g, m => ` ${m}`).trim() : name

export default defineComponent({
  name: 'RouteLinks',
  setup() {
    const router = useRouter()

    const moveTo = <N extends RouteNames<Routes>>(
      to: RoutiderRouteLocation<Routes, N>
    ) => {
      router.push(to)
    }

    return { routeNames, moveTo, formatRouteName }
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
