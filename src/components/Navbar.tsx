import { useEffect, useState } from 'react'
import { Menu, Play, X } from 'lucide-react'
import { LINKS, NAV_ITEMS, linksFor } from '../content'
import { useI18n } from '../i18n'
import { useActiveSection, useScrolled } from '../lib/hooks'
import { BrandText, GithubMark, LangSwitch, LogoMark } from './ui'

const SECTION_IDS = NAV_ITEMS.map((item) => item.id)

export default function Navbar() {
  const { t, lang } = useI18n()
  const L = linksFor(lang)
  const scrolled = useScrolled(8)
  const active = useActiveSection(SECTION_IDS)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth > 1240) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className={`site-header${scrolled || open ? ' is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <a className="brand" href="#top" aria-label={t('云上大亨 首页')} onClick={() => setOpen(false)}>
          <LogoMark size={34} />
          <BrandText />
        </a>

        <nav className="nav" aria-label={t('主导航')}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? 'is-active' : undefined}
              aria-current={active === item.id ? 'true' : undefined}
            >
              {t(item.label)}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <LangSwitch className="lang-switch--header" />
          <a className="icon-btn" href={LINKS.repo} target="_blank" rel="noopener noreferrer" aria-label={t('GitHub 仓库')}>
            <GithubMark size={18} />
          </a>
          <a className="btn btn--primary btn--sm header-play" href={L.play} target="_blank" rel="noopener noreferrer">
            <Play size={14} fill="currentColor" aria-hidden="true" />
            {t('开始游戏')}
          </a>
          <button
            type="button"
            className="icon-btn burger"
            aria-label={open ? t('关闭菜单') : t('打开菜单')}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="drawer" aria-label={t('移动端导航')}>
          <div className="container">
            <LangSwitch full className="lang-switch--drawer" />
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? 'is-active' : undefined}
                aria-current={active === item.id ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                {t(item.label)}
              </a>
            ))}
            <a className="btn btn--primary btn--lg drawer__play" href={L.play} target="_blank" rel="noopener noreferrer">
              <Play size={16} fill="currentColor" aria-hidden="true" />
              {t('开始游戏')}
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
