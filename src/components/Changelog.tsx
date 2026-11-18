import { ArrowUpRight, History } from 'lucide-react'
import { CHANGELOG, CHANGELOG_ROUNDS, LINKS, RELEASE } from '../content'
import { useI18n } from '../i18n'
import { Reveal, SectionHeading, ZhOnly } from './ui'

export default function Changelog() {
  const { t, tf, kw } = useI18n()
  return (
    <section className="section section--soft" id="updates">
      <div className="container">
        <SectionHeading
          eyebrow="Changelog"
          title={tf('持续打磨，已经更新 {0} 轮', CHANGELOG_ROUNDS)}
          lead={t('每一轮都写进了更新说明：改了什么、为什么改，还附上模拟对局的数据。')}
        />

        <ol className="timeline">
          {CHANGELOG.map((c, i) => (
            <li key={c.round} className={`timeline__item${c.latest ? ' is-latest' : ''}`}>
              <Reveal delay={i * 80} fill>
                <div className="timeline__card">
                  <span className="timeline__dot" aria-hidden="true" />
                  <div className="timeline__meta">
                    <b>{t(c.round)}</b>
                    <span>{c.date}</span>
                    {c.latest && <em>{tf('最新 · {0}', RELEASE.version)}</em>}
                  </div>
                  <p>{kw(t(c.title))}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal>
          <div className="timeline__more">
            <a className="btn btn--secondary" href={LINKS.changelog} target="_blank" rel="noopener noreferrer">
              <History size={16} aria-hidden="true" />
              {t('查看完整更新说明')}
              <ZhOnly />
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
