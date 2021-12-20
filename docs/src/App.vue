<template>
  <h1 class="title">Vue Routider</h1>
  <route-links />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RouteLinks from '/@/components/RouteLinks.vue'

export default defineComponent({
  name: 'App',
  components: {
    RouteLinks
  }
})
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 3rem;
}
</style>
