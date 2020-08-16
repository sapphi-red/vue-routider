import { markdownPlugin, Mode } from 'vite-plugin-markdown'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const FileNamePrefix = 'f='
const LinesPrefix = 'l='

const findMeta = (metas: string[], prefix: string): string =>
  (metas.find(s => s.startsWith(prefix)) ?? prefix).slice(prefix.length)

const wrapLines = (code: string, lines: string[]) =>
  code
    .replace(/\n$/, '')
    .split('\n')
    .map(
      (line, i) =>
        `<div class="hljs-line"${
          lines.includes('' + i) ? ' data-is-highlight' : ''
        }>${line}</div>`
    )
    .join('')

const md = new MarkdownIt({
  highlight(code, meta) {
    const metas = meta.split(':')
    const lang = metas[0]
    const filename = findMeta(metas, FileNamePrefix)
    const lines = findMeta(metas, LinesPrefix).split(',')

    let output = ''
    if (lang && hljs.getLanguage(lang)) {
      try {
        output = wrapLines(hljs.highlight(lang, code).value, lines)
        // eslint-disable-next-line no-empty
      } catch {}
    }
    if (output === '') {
      output = wrapLines(md.utils.escapeHtml(code), lines)
    }
    return `<pre class="hljs"${
      filename !== '' ? ` data-filename="${filename}"` : ''
    }><code>${output}</code></pre>`
  }
})

export default markdownPlugin({
  mode: ['vue' as Mode],
  markdownIt: md
})
