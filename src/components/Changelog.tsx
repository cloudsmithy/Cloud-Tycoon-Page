import { ArrowUpRight, History } from 'lucide-react'
import { CHANGELOG, CHANGELOG_ROUNDS, LINKS, RELEASE } from '../content'
import { Reveal, SectionHeading } from './ui'

export default function Changelog() {
  return (
    <section className="section section--soft" id="updates">
      <div className="container">
        <SectionHeading
          eyebrow="Changelog"
          title={`持续打磨，已经更新 ${CHANGELOG_ROUNDS} 轮`}
          lead="每一轮都写进了更新说明：改了什么、为什么改，还附上模拟对局的数据。"
        />

        <ol className="timeline">
          {CHANGELOG.map((c, i) => (
            <li key={c.round} className={`timeline__item${c.latest ? ' is-latest' : ''}`}>
              <Reveal delay={i * 80} fill>
                <div className="timeline__card">
                  <span className="timeline__dot" aria-hidden="true" />
                  <div className="timeline__meta">
                    <b>{c.round}</b>
                    <span>{c.date}</span>
                    {c.latest && <em>最新 · {RELEASE.version}</em>}
                  </div>
                  <p>{c.title}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal>
          <div className="timeline__more">
            <a className="btn btn--secondary" href={LINKS.changelog} target="_blank" rel="noopener noreferrer">
              <History size={16} aria-hidden="true" />
              查看完整更新说明
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
