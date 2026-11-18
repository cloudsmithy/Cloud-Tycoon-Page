import { useState } from 'react'
import { ArrowUpRight, CirclePlay } from 'lucide-react'
import { LINKS, MODES, WIN_CONDITIONS, WIN_NOTE } from '../content'
import { handleTabKeys } from '../lib/hooks'
import { useVideo } from '../lib/video'
import { Reveal, SectionHeading } from './ui'

const DEFAULT_MODE = MODES.findIndex((m) => m.id === 'standard')

export default function Modes() {
  const [index, setIndex] = useState(DEFAULT_MODE)
  const openVideo = useVideo()
  const mode = MODES[index]
  const Icon = mode.icon

  return (
    <section className="section" id="modes">
      <div className="container">
        <SectionHeading
          eyebrow="Modes"
          title="6 种模式，从聚会暖场到地狱难度"
          lead="默认打满 15 轮按估值排名，约 20 分钟一局。每个模式都配了一段一两分钟的玩法讲解。"
        />

        <Reveal>
          <div className="modes">
            <div className="modes__list" role="tablist" aria-label="游戏模式" aria-orientation="vertical">
              {MODES.map((m, i) => {
                const TabIcon = m.icon
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="tab"
                    id={`mode-tab-${m.id}`}
                    aria-selected={i === index}
                    aria-controls="mode-panel"
                    tabIndex={i === index ? 0 : -1}
                    className="mode-tab"
                    onClick={() => setIndex(i)}
                    onKeyDown={(e) => handleTabKeys(e, i, MODES.length, setIndex)}
                  >
                    <span className={`icon-tile icon-tile--sm tone-${m.tone}`}>
                      <TabIcon size={18} aria-hidden="true" />
                    </span>
                    <span className="mode-tab__text">
                      <b>{m.name}</b>
                      <small>{m.tag}</small>
                    </span>
                  </button>
                )
              })}
            </div>

            <div
              className={`mode-panel tone-${mode.tone}`}
              role="tabpanel"
              id="mode-panel"
              aria-labelledby={`mode-tab-${mode.id}`}
            >
              <div className="mode-panel__head">
                <span className={`icon-tile tone-${mode.tone}`}>
                  <Icon size={24} aria-hidden="true" />
                </span>
                <div>
                  <h3>{mode.name}</h3>
                  <span className="mode-badge">{mode.tag}</span>
                </div>
              </div>
              <p className="mode-panel__desc">{mode.desc}</p>
              <dl className="facts">
                <div className="fact">
                  <dt>时长</dt>
                  <dd>{mode.pace}</dd>
                </div>
                <div className="fact">
                  <dt>适合</dt>
                  <dd>{mode.fit}</dd>
                </div>
                <div className="fact">
                  <dt>规则复杂度</dt>
                  <dd>
                    <span className="meter" role="img" aria-label={`${mode.level} / 5`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <i key={n} className={n <= mode.level ? 'is-on' : undefined} />
                      ))}
                    </span>
                  </dd>
                </div>
              </dl>
              <div className="mode-panel__actions">
                <button type="button" className="btn btn--primary" onClick={() => openVideo(mode.video)}>
                  <CirclePlay size={18} aria-hidden="true" />
                  看{mode.name}讲解
                  <span className="btn__meta btn__meta--on-primary">{mode.video.duration}</span>
                </button>
                <a className="btn btn--secondary" href={LINKS.playCn} target="_blank" rel="noopener noreferrer">
                  开一局试试
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="wins">
          {WIN_CONDITIONS.map((w, i) => {
            const WinIcon = w.icon
            return (
              <Reveal key={w.title} delay={i * 80} fill>
                <div className="win">
                  <span className="icon-tile icon-tile--sm tone-amber">
                    <WinIcon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <h4>{w.title}</h4>
                    <p>{w.desc}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
        <p className="wins__note">{WIN_NOTE}</p>
      </div>
    </section>
  )
}
