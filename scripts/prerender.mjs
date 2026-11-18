// 把首页预渲染成静态 HTML：搜索引擎（包括不跑 JS 的爬虫）能直接读到正文，JS 加载前页面也完整可见。
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = join(root, 'dist', 'index.html')
const ssrDir = join(root, 'dist-ssr')

const { render } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)
const template = readFileSync(htmlPath, 'utf8')
if (!template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html 里没有 <!--app-html--> 占位符')
}

const appHtml = render()
const html = template
  // 用函数替换，避免正文里的 $ 符号被当成替换模式
  .replace('<!--app-html-->', () => appHtml)
  // 同源部署用不到 crossorigin；去掉后直接双击打开 dist/index.html 也能加载样式
  .replace(/ crossorigin(?=[\s>])/g, '')

writeFileSync(htmlPath, html)
rmSync(ssrDir, { recursive: true, force: true })
console.log(`prerendered dist/index.html (${(html.length / 1024).toFixed(1)} KB)`)
