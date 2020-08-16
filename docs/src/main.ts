import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import 'prismjs/themes/prism-okaidia.css'
import './index.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
