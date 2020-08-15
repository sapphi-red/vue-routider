<template>
  <div>
    <a @click="moveTo('Index')">Index</a>
    <span>|</span>
    <a @click="moveTo('Hello')">Hello</a>
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
      name: RoutiderRouteLocation<Routes, N>
    ) => {
      router.push({ name })
    }

    return { moveTo }
  }
})
</script>
