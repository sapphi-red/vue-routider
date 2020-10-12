import { markdownPlugin, Mode } from 'vite-plugin-markdown'
import MarkdownIt from 'markdown-it'
import Prism from 'prismjs'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const loadLanguages = require('prismjs/components/')
loadLanguages()

const FileNamePrefix = 'f='
const LinesPrefix = 'l='

const findMeta = (metas: string[], prefix: string): string => {
  const meta = metas.find(s => s.startsWith(prefix))
  if (!meta) return ''
  return meta.slice(prefix.length)
}

const wrapLines = (code: string, lines: string[]) =>
  code
    .replace(/\n$/, '')
    .split('\n')
    .map(
      (line, i) =>
        `<div class="prismjs-line"${
          lines.includes('' + (i + 1)) ? ' data-is-highlight' : ''
        }>${line}</div>`
    )
    .join('')

const md = new MarkdownIt({
  html: true,
  highlight(code, meta) {
    const metas = meta.split(':')
    let lang = metas[0]
    const filename = findMeta(metas, FileNamePrefix)
    const lines = findMeta(metas, LinesPrefix).split(',')

    let output = ''
    if (lang in Prism.languages) {
      try {
        output = wrapLines(
          Prism.highlight(code, Prism.languages[lang], lang),
          lines
        )
        // eslint-disable-next-line no-empty
      } catch {}
    } else {
      lang = 'text'
    }
    if (output === '') {
      output = wrapLines(md.utils.escapeHtml(code), lines)
    }
    return `<pre class="prismjs language-${lang}"${
      filename !== '' ? ` data-filename="${filename}"` : ''
    }><code>${output}</code></pre>`
  }
})
md.renderer.rules.link_open = (tokens, idx) => {
  const token = tokens[idx]
  const href = token.attrGet('href')
  if (href && href.startsWith('/')) {
    return `<router-link to="${href}">`
  } else {
    return `<a href="${href}" target="_blank">`
  }
}
md.renderer.rules.link_close = (tokens, idx) => {
  const token = tokens[idx - 2]
  const href = token.attrGet('href')
  if (href && href.startsWith('/')) {
    return '</router-link>'
  } else {
    return '</a>'
  }
}

export default markdownPlugin({
  mode: ['vue' as Mode],
  markdownIt: md
})
