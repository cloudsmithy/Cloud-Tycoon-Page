import { Check } from 'lucide-react'
import { ARCH_CATEGORIES, SHOWCASE, shot, type ShowcaseRow } from '../content'
import { useI18n } from '../i18n'
import ArchDiagram from './ArchDiagram'
import { Reveal, SectionHeading, Zoomable } from './ui'

const CARDS = [
  { cls: 'fan__card--a', file: 'card-share', alt: 're:Invent 卡「技术分享会」：每位其他玩家讲一个亚马逊云科技知识点' },
  { cls: 'fan__card--c', file: 'card-hackathon', alt: 're:Invent 卡「Hackathon 拿了奖」：选一块服务免费加 1 份容量' },
  { cls: 'fan__card--b', file: 'card-activate', alt: 're:Invent 卡「拿到 Activate 创业扶持 Credits」：领 $100，每有一个生效的架构再领 $50' },
]

function Shot({ file, alt, width, height, className }: { file: string; alt: string; width: number; height: number; className: string }) {
  const { lang } = useI18n()
  const src = shot(lang, `${file}.webp`)
  return (
    <Zoomable image={{ src, alt, width, height }}>
      <img className={`shot ${className}`} src={src} width={width} height={height} loading="lazy" decoding="async" alt={alt} />
    </Zoomable>
  )
}

function Visual({ id }: { id: ShowcaseRow['id'] }) {
  const { t, lang } = useI18n()
  if (id === 'deed') {
    return (
      <div className="stage tone-orange">
        <Shot
          file="deed"
          alt={t('EC2 服务卡：是什么、常用来做什么、当前级别、过路费、每圈运行费和关联的有效架构')}
          width={733}
          height={1100}
          className="shot--deed"
        />
      </div>
    )
  }
  if (id === 'cards') {
    return (
      <div className="stage tone-pink">
        <div className="fan">
          {CARDS.map((c) => {
            const src = shot(lang, `${c.file}.webp`)
            const alt = t(c.alt)
            return (
              <Zoomable key={c.file} className={`fan__card ${c.cls}`} image={{ src, alt, width: 600, height: 838 }}>
                <img src={src} width={600} height={838} loading="lazy" decoding="async" alt={alt} />
              </Zoomable>
            )
          })}
        </div>
      </div>
    )
  }
  if (id === 'arch') {
    return (
      <div className="stage tone-violet">
        <ArchDiagram />
      </div>
    )
  }
  return (
    <div className="stage tone-blue">
      <Shot
        file="setup"
        alt={t('开局设置：UG 活动局一键开局，选择玩家人数、难度模式和胜利条件')}
        width={756}
        height={1100}
        className="shot--setup"
      />
    </div>
  )
}

export default function Showcase() {
  const { t, kw } = useI18n()
  return (
    <section className="section section--soft" id="showcase">
      <div className="container">
        <SectionHeading
          eyebrow="Inside the game"
          title={t('在游戏里，你会遇到这些')}
          lead={t('服务卡、事件卡和开局设置都是游戏里的真实画面。')}
        />
        <div className="showcase">
          {SHOWCASE.map((row, i) => (
            <div key={row.id} className={`show-row${i % 2 ? ' show-row--reverse' : ''}`}>
              <Reveal className="show-row__visual">
                <Visual id={row.id} />
              </Reveal>
              <Reveal className="show-row__copy" delay={100}>
                <p className="eyebrow">{row.eyebrow}</p>
                <h3>{kw(t(row.title))}</h3>
                <p className="show-row__text">{kw(t(row.text))}</p>
                {row.points && (
                  <ul className="checklist">
                    {row.points.map((p) => (
                      <li key={p}>
                        <Check size={14} strokeWidth={3} aria-hidden="true" />
                        <span>{kw(t(p))}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {row.id === 'arch' && (
                  <ul className="arch-cats" aria-label={t('架构分类')}>
                    {ARCH_CATEGORIES.map(([name, count]) => (
                      <li key={name}>
                        {t(name)}
                        <b>{count}</b>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
