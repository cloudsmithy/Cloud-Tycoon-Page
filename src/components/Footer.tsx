import { ArrowUp, Heart } from 'lucide-react'
import { DISCLAIMERS, FOOTER_COLUMNS } from '../content'
import { useScrolled } from '../lib/hooks'
import { LogoMark } from './ui'

export default function Footer() {
  const showTop = useScrolled(900)

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="brand" href="#top">
              <LogoMark size={32} />
              <span className="brand__text">
                云上大亨
                <small>Cloud Tycoon</small>
              </span>
            </a>
            <p>亚马逊云科技 User Group 原创的云架构桌游。买服务、组架构、控账单，和朋友争夺冠军奖杯，在骰子声里熟悉云服务的能力边界和典型用法。</p>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="footer-col">
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="footer-thanks">
          <Heart size={14} aria-hidden="true" />
          感谢虫虫、辣条、Damo、Yuki 和 UG 的小伙伴们帮忙测试、做美工、修 bug、架设国内服务器。
        </p>

        <div className="footer-legal">
          {DISCLAIMERS.map((text) => (
            <p key={text.slice(0, 16)}>{text}</p>
          ))}
        </div>

        <div className="footer-bottom">
          <span>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> 亚马逊云科技 User Group · 云上大亨开发小组
          </span>
          <span>源码公开在 GitHub</span>
        </div>
      </div>

      {showTop && (
        <a className="back-top" href="#top" aria-label="回到顶部">
          <ArrowUp size={18} aria-hidden="true" />
        </a>
      )}
    </footer>
  )
}
