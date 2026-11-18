// 把首页预渲染成三份静态 HTML：index.html（中文）、en.html、ja.html。
// 搜索引擎（包括不跑 JS 的爬虫）能直接读到正文，JS 加载前页面也完整可见。
// 结束时列出查不到译文的中文，改了文案能马上发现漏译；I18N_STRICT=1 时有漏译就让构建失败。
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')
// 正式地址，用于规范地址、hreflang 和分享图；换了域名时设 SITE_URL
const SITE_URL = (process.env.SITE_URL || 'https://cloud-tycoon-page.pages.dev/').replace(/\/?$/, '/')

const { render, headHtml, missing, LANGS, LANG_META } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)
const template = readFileSync(join(dist, 'index.html'), 'utf8')
for (const marker of ['<!--app-html-->', '<!--head:start-->', '<!--head:end-->']) {
  if (!template.includes(marker)) throw new Error(`dist/index.html 里没有 ${marker} 占位符`)
}

for (const lang of LANGS) {
  const appHtml = render(lang)
  const html = template
    .replace(/<html lang="[^"]*">/, `<html lang="${LANG_META[lang].htmlLang}">`)
    // 用函数替换，避免正文里的 $ 符号被当成替换模式
    .replace(/<!--head:start-->[\s\S]*?<!--head:end-->/, () => headHtml(lang, SITE_URL))
    .replace('<!--app-html-->', () => appHtml)
    // 英文、日文页预加载对应语言的棋盘截图
    .replace('href="./images/shots/board.webp"', `href="./images/shots/${lang === 'zh' ? '' : `${lang}/`}board.webp"`)
    // 同源部署用不到 crossorigin；去掉后直接双击打开 dist/index.html 也能加载样式
    .replace(/ crossorigin(?=[\s>])/g, '')
  const file = lang === 'zh' ? 'index.html' : `${lang}.html`
  writeFileSync(join(dist, file), html)
  console.log(`prerendered dist/${file} (${(html.length / 1024).toFixed(1)} KB)`)
}
rmSync(ssrDir, { recursive: true, force: true })

let total = 0
for (const lang of LANGS) {
  const list = [...missing[lang]]
  total += list.length
  if (list.length) {
    console.warn(`\n⚠ ${lang} 有 ${list.length} 条没有译文：`)
    for (const s of list) console.warn(`  ${s}`)
  }
}
if (!total) console.log('i18n: en / ja 全部有译文')
if (total && process.env.I18N_STRICT === '1') process.exit(1)
