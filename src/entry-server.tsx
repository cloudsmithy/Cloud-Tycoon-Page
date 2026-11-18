import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import type { Lang } from './i18n'

export { LANGS, LANG_META, missing } from './i18n'
export { headHtml } from './i18n/head'

export function render(lang: Lang): string {
  return renderToString(
    <StrictMode>
      <App lang={lang} />
    </StrictMode>,
  )
}
