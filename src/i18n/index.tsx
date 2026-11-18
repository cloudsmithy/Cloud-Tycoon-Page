/**
 * 多语言：和游戏的做法一样，用中文原文当键。
 * content.ts 和组件里照常写中文，渲染时用 t() 按词典换成英文或日文；查不到的原样显示中文，
 * 并记进 missing，预渲染结束时列出来，改了文案马上能发现漏译。
 */
import { createContext, useContext, type ReactNode } from 'react'
import enDict from './en.json'
import jaDict from './ja.json'
import { keepWords } from '../lib/text'

export type Lang = 'zh' | 'en' | 'ja'
export const LANGS: Lang[] = ['zh', 'en', 'ja']

/** html lang、页面文件、语言切换上显示的名字、Open Graph 的 locale */
export const LANG_META: Record<Lang, { htmlLang: string; file: string; label: string; short: string; ogLocale: string }> = {
  zh: { htmlLang: 'zh-CN', file: './', label: '中文', short: '中', ogLocale: 'zh_CN' },
  en: { htmlLang: 'en', file: './en.html', label: 'English', short: 'EN', ogLocale: 'en_US' },
  ja: { htmlLang: 'ja', file: './ja.html', label: '日本語', short: '日', ogLocale: 'ja_JP' },
}

const DICTS: Record<Exclude<Lang, 'zh'>, Record<string, string>> = {
  en: enDict as Record<string, string>,
  ja: jaDict as Record<string, string>,
}

const HAS_CJK = /[㐀-鿿]/

/** 查不到译文的中文（只记含汉字的） */
export const missing: Record<Lang, Set<string>> = { zh: new Set(), en: new Set(), ja: new Set() }

export function translate(lang: Lang, zh: string): string {
  if (lang === 'zh' || !zh) return zh
  const hit = DICTS[lang][zh]
  if (hit !== undefined) return hit
  if (HAS_CJK.test(zh)) missing[lang].add(zh)
  return zh
}

/** 把 {0}、{1} 换成参数 */
export const format = (s: string, ...args: (string | number)[]) =>
  s.replace(/\{(\d+)\}/g, (_, i: string) => String(args[Number(i)] ?? ''))

const LangContext = createContext<Lang>('zh')

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>
}

export function useI18n() {
  const lang = useContext(LangContext)
  const t = (zh: string) => translate(lang, zh)
  const tf = (zh: string, ...args: (string | number)[]) => format(translate(lang, zh), ...args)
  /** 中文、日文里让英文词组不拆行；英文本身靠空格断行，不能处理 */
  const kw = (text: string) => (lang === 'en' ? text : keepWords(text))
  return { lang, t, tf, kw }
}

export function langFromHtml(htmlLang: string | undefined | null): Lang {
  const l = (htmlLang || '').toLowerCase()
  if (l.startsWith('en')) return 'en'
  if (l.startsWith('ja')) return 'ja'
  return 'zh'
}
