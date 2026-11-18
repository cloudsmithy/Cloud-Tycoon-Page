import { ArrowLeftRight, BadgeCheck } from 'lucide-react'
import { CERTS, DLCS, SWITCHES } from '../content'
import { useI18n } from '../i18n'
import { Reveal, SectionHeading } from './ui'

export default function Expansions() {
  const { t, tf, kw } = useI18n()
  return (
    <section className="section section--soft" id="dlc">
      <div className="container">
        <SectionHeading
          eyebrow="Expansions"
          title={t('4 个玩法 DLC，3 个认证题库')}
          lead={t('开局时勾选即可。每个玩法 DLC 都带自己的规则、卡牌和题目；认证题库带错题本和刷题模式。')}
        />

        <div className="dlc-grid">
          {DLCS.map((d, i) => {
            const Icon = d.icon
            return (
              <Reveal key={d.name} delay={i * 70} fill>
                <article className="dlc">
                  <div className="dlc__head">
                    <span className={`icon-tile tone-${d.tone}`}>
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3>{t(d.name)}</h3>
                  </div>
                  <p className="dlc__rule">{kw(t(d.rule))}</p>
                  <div className="dlc__cards">
                    <span className="dlc__cards-label">{t('新增好运卡')}</span>
                    {d.cards.map((c) => (
                      <span key={c} className="card-chip">
                        {t(c)}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
        <p className="swipe-hint" aria-hidden="true">
          <ArrowLeftRight size={14} />
          {tf('左右滑动，查看 {0} 个玩法 DLC', DLCS.length)}
        </p>

        <Reveal>
          <div className="certs">
            <div className="certs__intro">
              <span className="icon-tile tone-blue">
                <BadgeCheck size={22} aria-hidden="true" />
              </span>
              <div>
                <h3>{t('认证题库 DLC')}</h3>
                <p>{kw(t('原创练习题，按官方考试指南的考点出，解析附官方文档。可以在对局里答，也可以单独开刷题模式。'))}</p>
              </div>
            </div>
            <ul className="certs__list">
              {CERTS.map((c) => (
                <li key={c.code} className="cert">
                  <span className="cert__code">{c.code}</span>
                  <span className="cert__name">{c.name}</span>
                  <span className="cert__count">
                    <b>{c.count}</b>
                    {t('道题')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="switches">
          {SWITCHES.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.name} delay={i * 80} fill>
                <article className="switch-card">
                  <span className="icon-tile icon-tile--sm tone-orange">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>
                      {t(s.name)}
                      <span className="switch-card__tag">{t('开关 · 默认关闭')}</span>
                    </h3>
                    <p>{kw(t(s.desc))}</p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
