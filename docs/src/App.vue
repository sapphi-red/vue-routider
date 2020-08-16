<template>
  <h1 class="title">Vue Routider</h1>
  <routes />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Routes from '/@/components/Routes.vue'

export default defineComponent({
  name: 'App',
  components: {
    Routes
  }
})
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 3rem;
}
</style>
