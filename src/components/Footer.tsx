import { ArrowUp, Heart } from 'lucide-react'
import { DISCLAIMERS, FOOTER_COLUMNS, LINKS, linksFor } from '../content'
import { useI18n } from '../i18n'
import { useScrolled } from '../lib/hooks'
import { BrandText, LangSwitch, LogoMark, ZhOnly } from './ui'

interface FooterLink {
  label: string
  href: string
  /** 只有中文的资源，英日文页上标出来 */
  zhOnly?: boolean
  /** 语言名不翻译 */
  raw?: boolean
}

function useColumns(): { title: string; links: FooterLink[] }[] {
  const { lang } = useI18n()
  if (lang === 'zh') return FOOTER_COLUMNS
  const L = linksFor(lang)
  return [
    {
      title: '开始游戏',
      links: [
        { label: '国际线路（GitHub Pages）', href: L.play },
        { label: '国内线路', href: L.playAlt },
        ...L.gameLangs.filter(([, href]) => href).map(([name, href]) => ({ label: name, href: href as string, raw: true })),
      ],
    },
    {
      title: '学习资料',
      links: [
        { label: '架构讲解', href: L.learnArch },
        { label: '服务知识点', href: L.learnSvc },
        { label: '玩法手册', href: L.docManual },
        { label: '规则书', href: LINKS.docRules, zhOnly: true },
      ],
    },
    {
      title: '社区',
      links: [
        { label: '游戏源码（GitHub）', href: LINKS.repo },
        { label: '官网源码（GitHub）', href: LINKS.siteRepo },
        { label: '问题反馈', href: LINKS.issues },
        { label: '更新说明', href: LINKS.changelog, zhOnly: true },
        { label: '常用手册（PDF）', href: LINKS.handbookDir, zhOnly: true },
      ],
    },
  ]
}

export default function Footer() {
  const { t, kw } = useI18n()
  const showTop = useScrolled(900)
  const columns = useColumns()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="brand" href="#top">
              <LogoMark size={32} />
              <BrandText />
            </a>
            <p>{kw(t('亚马逊云科技 User Group 原创的云架构桌游。买服务、组架构、控账单，和朋友争夺冠军奖杯，在骰子声里熟悉云服务的能力边界和典型用法。'))}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title} className="footer-col">
              <h4>{t(col.title)}</h4>
              <ul>
                {col.links.map((link: FooterLink) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.raw ? link.label : t(link.label)}
                    </a>
                    {link.zhOnly && <ZhOnly />}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="footer-thanks">
          <Heart size={14} aria-hidden="true" />
          {kw(t('感谢虫虫、辣条、Damo、Yuki 和 UG 的小伙伴们帮忙测试、做美工、修 bug、架设国内服务器。'))}
        </p>

        <div className="footer-legal">
          {DISCLAIMERS.map((text) => (
            <p key={text.slice(0, 16)}>{kw(t(text))}</p>
          ))}
        </div>

        <div className="footer-bottom">
          <span>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {kw(t('亚马逊云科技 User Group · 云上大亨开发小组'))}
          </span>
          <LangSwitch full className="lang-switch--footer" />
          <a href={LINKS.repo} target="_blank" rel="noopener noreferrer">
            {t('源码公开在 GitHub')}
          </a>
        </div>
      </div>

      {showTop && (
        <a className="back-top" href="#top" aria-label={t('回到顶部')}>
          <ArrowUp size={18} aria-hidden="true" />
        </a>
      )}
    </footer>
  )
}
