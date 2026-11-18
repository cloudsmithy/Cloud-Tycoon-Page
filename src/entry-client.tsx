import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import { LANG_META, langFromHtml, type Lang } from './i18n'
import './styles/site.css'

// 预渲染的 index.html / en.html / ja.html 各自写好了 <html lang>；开发时可以用 ?lang=en 切换
let lang: Lang = langFromHtml(document.documentElement.lang)
if (import.meta.env.DEV) {
  const q = new URLSearchParams(location.search).get('lang')
  if (q === 'zh' || q === 'en' || q === 'ja') {
    lang = q
    document.documentElement.lang = LANG_META[q].htmlLang
  }
}

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App lang={lang} />
  </StrictMode>
)

// 构建产物里是预渲染好的 HTML，直接接管；开发模式下是空容器，正常渲染
if (container.firstElementChild) hydrateRoot(container, app)
else createRoot(container).render(app)
