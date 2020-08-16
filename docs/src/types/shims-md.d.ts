declare module '*.md' {
  import { defineComponent } from 'vue'
  export const VueComponent: ReturnType<typeof defineComponent>
}
