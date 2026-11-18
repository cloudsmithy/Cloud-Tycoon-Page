import {
  ArrowUpRight,
  CalendarDays,
  FileText,
  Globe,
  MapPin,
  PartyPopper,
  Presentation,
  Printer,
  Radio,
  Timer,
  Users,
} from 'lucide-react'
import { HANDBOOKS, LINKS, RECENT_EVENTS, UG_PRESET, handbookUrl, linksFor } from '../content'
import { useI18n, type Lang } from '../i18n'
import { Reveal, SectionHeading, ZhOnly } from './ui'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** 2026-11-13 → 11月13日 / Nov 13（直接拆字符串，不经过 Date，避免时区差一天） */
const monthDay = (iso: string, lang: Lang) => {
  const [, m, d] = iso.split('-').map(Number)
  return lang === 'en' ? `${MONTHS[m - 1]} ${d}` : `${m}月${d}日`
}

export default function Events() {
  const { t, kw, lang } = useI18n()
  const L = linksFor(lang)

  return (
    <section className="section section--soft" id="events">
      <div className="container">
        <SectionHeading
          eyebrow="Community"
          title={t('带去你的 User Group 活动')}
          lead={t('线上联机、线下开黑都合适。开局页有专门给活动准备的「UG 活动局」，仓库里还有整套活动手册和实体版打印文件。')}
        />

        <Reveal>
          <div className="recent">
            <h3 className="recent__title">
              <CalendarDays size={18} aria-hidden="true" />
              {t('近期活动')}
            </h3>
            <ol className="recent__list">
              {RECENT_EVENTS.map((e) => {
                const PlaceIcon = e.online ? Radio : MapPin
                return (
                  <li key={e.date + e.title} className="recent__item">
                    <time className="recent__date" dateTime={e.date}>
                      <b>{monthDay(e.date, lang)}</b>
                      <span>{t(e.weekday)}</span>
                    </time>
                    <div className="recent__body">
                      <b>{kw(t(e.title))}</b>
                      <span>
                        <PlaceIcon size={13} aria-hidden="true" />
                        {t(e.place)}
                        <em className="recent__status-inline">{t(' · 已举办')}</em>
                      </span>
                    </div>
                    <span className="recent__status" aria-hidden="true">
                      {t('已举办')}
                    </span>
                  </li>
                )
              })}
            </ol>
          </div>
        </Reveal>

        <div className="events">
          <Reveal fill>
            <div className="ug-card">
              <span className="ug-card__badge">
                <Presentation size={15} aria-hidden="true" />
                {t('开局页一键开局')}
              </span>
              <h3>{t('UG 活动局')}</h3>
              <p>{kw(t(UG_PRESET))}</p>
              <ul className="ug-card__facts">
                <li>
                  <PartyPopper aria-hidden="true" />
                  {t('娱乐模式 + 边玩边答题')}
                </li>
                <li>
                  <Timer aria-hidden="true" />
                  {t('12 轮或 30 分钟，先到为准')}
                </li>
                <li>
                  <Users aria-hidden="true" />
                  {t('4 人一桌')}
                </li>
              </ul>
              <div className="ug-card__actions">
                <a className="btn btn--primary" href={L.play} target="_blank" rel="noopener noreferrer">
                  {t('打开游戏开局页')}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal fill delay={90}>
            <div className="handbooks">
              <div className="handbooks__head">
                <h3>{t('常用手册（PDF）')}</h3>
                <a href={LINKS.handbookDir} target="_blank" rel="noopener noreferrer">
                  {t('在 GitHub 查看全部')}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
              <ol className="handbooks__list">
                {HANDBOOKS.map((h, i) => {
                  // 玩法速览、玩法手册有英日文版（Markdown），英日文页直接链过去；其余 PDF 只有中文
                  const localized = lang !== 'zh' && i < 2
                  const href = localized ? (i === 0 ? L.docQuick : L.docManual) : handbookUrl(h.file)
                  return (
                    <li key={h.file}>
                      <a className="handbook" href={href} target="_blank" rel="noopener noreferrer">
                        <span className="handbook__num">{i + 1}</span>
                        <span className="handbook__text">
                          <b>
                            {t(h.title)}
                            {!localized && <ZhOnly />}
                          </b>
                          <small>{t(h.desc)}</small>
                        </span>
                        {localized ? (
                          <span className="handbook__tag">
                            <Globe size={13} aria-hidden="true" />
                            {t('在线版')}
                          </span>
                        ) : h.print ? (
                          <span className="handbook__tag">
                            <Printer size={13} aria-hidden="true" />
                            {t('打印')}
                          </span>
                        ) : (
                          <FileText size={16} className="handbook__icon" aria-hidden="true" />
                        )}
                      </a>
                    </li>
                  )
                })}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
