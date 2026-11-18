import { useState } from 'react'
import { ArrowLeftRight, ChevronDown, Zap } from 'lucide-react'
import { PARTNERS, ROLES, img, type Role } from '../content'
import { useI18n } from '../i18n'
import { Reveal, SectionHeading } from './ui'

type Filter = 'all' | Role['type']

const FILTERS: [Filter, string][] = [
  ['all', '全部'],
  ['customer', '客户'],
  ['agent', '代理商'],
]

// 默认只露出前几个，其余的仍然渲染进 HTML（搜索引擎能读到），只是先折叠
const PREVIEW = 6

const countOf = (f: Filter) => (f === 'all' ? ROLES.length : ROLES.filter((r) => r.type === f).length)

export default function Roles() {
  const { t, tf, kw } = useI18n()
  const [filter, setFilter] = useState<Filter>('all')
  const [expanded, setExpanded] = useState(false)
  const list = ROLES.filter((r) => filter === 'all' || r.type === filter)
  const collapsible = list.length > PREVIEW

  return (
    <section className="section" id="roles">
      <div className="container">
        <SectionHeading
          eyebrow="Characters"
          title={t('15 个角色，每个都藏着一张翻盘牌')}
          lead={t('12 个客户角色和 3 个代理商，各有专长和短板。总资产跌破开局资金一半时，可以发动一次专属技能。')}
        />

        <Reveal>
          <div className="partners">
            <div className="partners__art">
              {PARTNERS.map((p) => (
                <figure key={p.name} className="partner">
                  <img
                    src={img(p.img)}
                    width={p.width}
                    height={p.height}
                    loading="lazy"
                    decoding="async"
                    alt={tf('{0}的棋子立牌', t(p.name))}
                  />
                  <figcaption>{t(p.name)}</figcaption>
                </figure>
              ))}
            </div>
            <p className="partners__note">{kw(t('棋子立牌是 User Group 活动里的四位伙伴，每局随机分给各个座位。'))}</p>
          </div>
        </Reveal>

        <div className="roles-toolbar">
          <div className="filter" role="group" aria-label={t('筛选角色')}>
            {FILTERS.map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`filter__btn${filter === key ? ' is-active' : ''}`}
                aria-pressed={filter === key}
                onClick={() => {
                  setFilter(key)
                  setExpanded(false)
                }}
              >
                {t(label)}
                <span>{countOf(key)}</span>
              </button>
            ))}
          </div>
          <p className="roles-toolbar__hint">{kw(t('开局可以「三选一挑角色」，不开就随机分；代理商角色在开启代理商模式后可用。'))}</p>
        </div>

        <ul className="roles-grid" id="roles-grid">
          {list.map((r, i) => (
            <li key={r.name} className={`role${collapsible && !expanded && i >= PREVIEW ? ' is-folded' : ''}`}>
              <div className="role__head">
                <h3>{t(r.name)}</h3>
                <span className={`role__type role__type--${r.type}`}>{r.type === 'agent' ? t('代理商') : t('客户')}</span>
              </div>
              <p className="role__perk">{kw(t(r.perk))}</p>
              <div className="role__skill">
                <div className="role__skill-inner">
                  <span className="role__skill-label">
                    <Zap size={13} aria-hidden="true" />
                    {t('翻盘技能')}
                  </span>
                  <b>{t(r.skill)}</b>
                  <p>{kw(t(r.effect))}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="swipe-hint" aria-hidden="true">
          <ArrowLeftRight size={14} />
          {tf('左右滑动，查看全部 {0} 个角色', list.length)}
        </p>

        {collapsible && (
          <div className="roles-more">
            <button
              type="button"
              className="btn btn--secondary"
              aria-expanded={expanded}
              aria-controls="roles-grid"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? t('收起') : tf('展开全部 {0} 个角色', list.length)}
              <ChevronDown size={16} aria-hidden="true" className={expanded ? 'is-flipped' : undefined} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
