<template>
  <div>
    <a @click="moveTo({ name: 'Index' })">Index</a>
    <span>|</span>
    <a @click="moveTo({ name: 'Hello' })">Hello</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouteNames, RoutiderRouteLocation } from 'vue-routider'
import { Routes, useRouter } from '/@/router'

export default defineComponent({
  name: 'Routes',
  setup() {
    const router = useRouter()

    const moveTo = <N extends RouteNames<Routes>>(
      to: RoutiderRouteLocation<Routes, N>
    ) => {
      router.push(to)
    }

    return { moveTo }
  }
})
</script>
