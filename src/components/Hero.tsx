import {
  ArrowRight,
  BadgeCheck,
  CircleCheck,
  CirclePlay,
  Clock,
  Coins,
  Gift,
  Globe,
  MonitorSmartphone,
  Play,
  Users,
} from 'lucide-react'
import { Fragment } from 'react'
import { RELEASE, VIDEOS, img, linksFor, shot } from '../content'
import { useI18n, type Lang } from '../i18n'
import { useVideo } from '../lib/video'
import { BrowserFrame, Rich, Zoomable } from './ui'

/** 大标题：后半段用渐变色 */
const TITLE: Record<Lang, [string, string]> = {
  zh: ['云上', '大亨'],
  en: ['Cloud ', 'Tycoon'],
  ja: ['クラウド', 'タイクーン'],
}

export default function Hero() {
  const { t, kw, lang } = useI18n()
  const L = linksFor(lang)
  const openVideo = useVideo()
  const boardAlt = t('云上大亨游戏界面：48 格棋盘四周是 EC2、Lambda、RDS 等服务格，右侧是四位玩家的资产面板和对局动态')
  const board = shot(lang, 'board.webp')

  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <a className="hero__pill" href="#updates">
            <span className="hero__pill-tag">{RELEASE.version}</span>
            {kw(t(RELEASE.headline))}
            <ArrowRight size={14} aria-hidden="true" />
          </a>
          <p className="hero__kicker">{kw(t('亚马逊云科技 User Group 原创云架构桌游'))}</p>
          <h1 className="hero__title">
            {TITLE[lang][0]}
            {/* 两段之间留换行点：日文放不下时在「クラウド / タイクーン」之间换行，不拆词 */}
            <wbr />
            <span>{TITLE[lang][1]}</span>
          </h1>
          <p className="hero__slogan">{t('令人怀念的经典桌游玩法，搬到云上。')}</p>
          <p className="hero__desc">
            {kw(t('在亚马逊云科技上创业：买服务、做高可用、扛住 Health 事件、控制账单，把服务组成真实的架构，收取联合过路费。'))}
            {lang === 'en' ? ' ' : ''}
            {kw(t('一边玩，一边熟悉云服务的能力边界和典型用法。'))}
          </p>

          <div className="hero__cta">
            <a className="btn btn--primary btn--lg" href={L.play} target="_blank" rel="noopener noreferrer">
              <Play size={18} fill="currentColor" aria-hidden="true" />
              {t('立即开玩')}
            </a>
            <button type="button" className="btn btn--secondary btn--lg" onClick={() => openVideo(VIDEOS.trailer)}>
              <CirclePlay size={19} aria-hidden="true" />
              {t('观看宣传片')}
              <span className="btn__meta">{VIDEOS.trailer.duration}</span>
            </button>
          </div>

          <ul className="hero__meta">
            <li>
              <Users size={16} aria-hidden="true" />
              {t('2–4 人')}
            </li>
            <li>
              <Clock size={16} aria-hidden="true" />
              {t('约 20 分钟一局')}
            </li>
            <li>
              <MonitorSmartphone size={16} aria-hidden="true" />
              {t('浏览器即开即玩')}
            </li>
            <li>
              <BadgeCheck size={16} aria-hidden="true" />
              {t('免费 · 源码公开')}
            </li>
            <li>
              <Globe size={16} aria-hidden="true" />
              <span>
                {L.gameLangs.map(([name, href], i) => (
                  <Fragment key={name}>
                    {i > 0 && ' / '}
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {name}
                      </a>
                    ) : (
                      name
                    )}
                  </Fragment>
                ))}
              </span>
            </li>
          </ul>
          <p className="hero__route">
            {lang === 'zh' ? (
              <Rich text={t('国内用户走国内线路；海外访问请用 {0}。')}>
                <a href={L.playAlt} target="_blank" rel="noopener noreferrer">
                  {t('GitHub Pages 国际线路')}
                </a>
              </Rich>
            ) : (
              <Rich text={t('在中国大陆访问时，请改用 {0}。')}>
                <a href={L.playAlt} target="_blank" rel="noopener noreferrer">
                  {t('国内线路')}
                </a>
              </Rich>
            )}
          </p>
        </div>

        <div className="hero__visual">
          <div className="hero__glow" aria-hidden="true" />
          <Zoomable className="hero__zoom" image={{ src: board, alt: boardAlt, width: 2000, height: 1250 }}>
            <BrowserFrame src={board} width={2000} height={1250} eager alt={boardAlt} />
          </Zoomable>
          <img
            className="hero__char hero__char--han"
            src={img('chars/han_trophy.webp')}
            width={501}
            height={560}
            alt=""
            aria-hidden="true"
          />
          <img
            className="hero__char hero__char--chong"
            src={img('chars/chong_win.webp')}
            width={428}
            height={560}
            alt=""
            aria-hidden="true"
          />
          <div className="chip chip--rent" aria-hidden="true">
            <span className="chip__icon tone-orange">
              <Coins size={15} />
            </span>
            {t('过路费')} <b>+$1036</b>
          </div>
          <div className="chip chip--arch" aria-hidden="true">
            <span className="chip__icon tone-green">
              <CircleCheck size={15} />
            </span>
            {t('架构生效')} · {t('高可用入口')}
          </div>
          <div className="chip chip--event" aria-hidden="true">
            <span className="chip__icon tone-violet">
              <Gift size={15} />
            </span>
            re:Invent · {t('Hackathon 拿了奖')}
          </div>
        </div>
      </div>
    </section>
  )
}
