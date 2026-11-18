import { Fragment } from 'react'
import { ArrowRight, ArrowUpRight, CirclePlay, FileText } from 'lucide-react'
import { LEARN, SVC_ICONS, img } from '../content'
import { Reveal, SectionHeading } from './ui'

const FLOW = ['cloudfront', 'apigw', 'lambda', 'dynamodb']

function Stats({ items }: { items: string[][] }) {
  return (
    <dl className="learn-stats">
      {items.map(([num, label]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{num}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function Learn() {
  return (
    <section className="section section--soft" id="learn">
      <div className="container">
        <SectionHeading
          eyebrow="Learn"
          title="输赢之外，还有一座云架构学习中心"
          lead="游戏里每块服务、每个有效架构都能点进讲解页，中文、English、日本語三种语言，带字幕和配音。"
        />

        <div className="learn-grid">
          <Reveal fill>
            <a className="learn-card" href={LEARN.arch.href} target="_blank" rel="noopener noreferrer">
              <div className="learn-card__visual learn-card__visual--arch" aria-hidden="true">
                <div className="mini-flow">
                  {FLOW.map((icon, i) => (
                    <Fragment key={icon}>
                      {i > 0 && <ArrowRight size={16} className="mini-flow__arrow" />}
                      <img src={img(`aws/${icon}.svg`)} width={52} height={52} alt="" loading="lazy" />
                    </Fragment>
                  ))}
                </div>
                <div className="mini-tags">
                  <span>
                    <CirclePlay size={14} />
                    讲解视频 · 三维动画
                  </span>
                  <span>
                    <FileText size={14} />
                    图文讲解
                  </span>
                </div>
              </div>
              <div className="learn-card__body">
                <h3>
                  {LEARN.arch.title}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </h3>
                <p>{LEARN.arch.desc}</p>
                <Stats items={LEARN.arch.stats} />
              </div>
            </a>
          </Reveal>

          <Reveal fill delay={90}>
            <a className="learn-card" href={LEARN.svc.href} target="_blank" rel="noopener noreferrer">
              <div className="learn-card__visual learn-card__visual--svc" aria-hidden="true">
                <div className="svc-grid">
                  {SVC_ICONS.map((icon) => (
                    <img key={icon} src={img(`aws/${icon}.svg`)} width={44} height={44} alt="" loading="lazy" />
                  ))}
                </div>
              </div>
              <div className="learn-card__body">
                <h3>
                  {LEARN.svc.title}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </h3>
                <p>{LEARN.svc.desc}</p>
                <Stats items={LEARN.svc.stats} />
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
