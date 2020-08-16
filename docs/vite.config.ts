import { UserConfig } from 'vite'
import path from 'path'
import mdPlugin from './vite/markdown'

const config: UserConfig = {
  alias: {
    '/@/': path.resolve(__dirname, 'src')
  },
  plugins: [mdPlugin],
  optimizeDeps: {
    exclude: ['patch-package']
  }
}

export default config
