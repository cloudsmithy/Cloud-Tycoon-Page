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
import { LINKS, RELEASE, VIDEOS, img } from '../content'
import { useVideo } from '../lib/video'
import { BrowserFrame, Zoomable } from './ui'

const BOARD_ALT = '云上大亨游戏界面：48 格棋盘四周是 EC2、Lambda、RDS 等服务格，右侧是四位玩家的资产面板和对局动态'

export default function Hero() {
  const openVideo = useVideo()

  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <a className="hero__pill" href="#updates">
            <span className="hero__pill-tag">{RELEASE.version}</span>
            {RELEASE.headline}
            <ArrowRight size={14} aria-hidden="true" />
          </a>
          <p className="hero__kicker">亚马逊云科技 User Group 原创云架构桌游</p>
          <h1 className="hero__title">
            云上<span>大亨</span>
          </h1>
          <p className="hero__slogan">令人怀念的经典桌游玩法，搬到云上。</p>
          <p className="hero__desc">
            在亚马逊云科技上创业：买服务、做高可用、扛住 Health 事件、控制账单，把服务组成真实的架构，收取联合过路费。
            一边玩，一边熟悉云服务的能力边界和典型用法。
          </p>

          <div className="hero__cta">
            <a className="btn btn--primary btn--lg" href={LINKS.playCn} target="_blank" rel="noopener noreferrer">
              <Play size={18} fill="currentColor" aria-hidden="true" />
              立即开玩
            </a>
            <button type="button" className="btn btn--secondary btn--lg" onClick={() => openVideo(VIDEOS.trailer)}>
              <CirclePlay size={19} aria-hidden="true" />
              观看宣传片
              <span className="btn__meta">{VIDEOS.trailer.duration}</span>
            </button>
          </div>

          <ul className="hero__meta">
            <li>
              <Users size={16} aria-hidden="true" />
              2–4 人
            </li>
            <li>
              <Clock size={16} aria-hidden="true" />
              约 20 分钟一局
            </li>
            <li>
              <MonitorSmartphone size={16} aria-hidden="true" />
              浏览器即开即玩
            </li>
            <li>
              <BadgeCheck size={16} aria-hidden="true" />
              免费 · 源码公开
            </li>
            <li>
              <Globe size={16} aria-hidden="true" />
              <span>
                中文 / <a href={LINKS.playEn} target="_blank" rel="noopener noreferrer">English</a> /{' '}
                <a href={LINKS.playJa} target="_blank" rel="noopener noreferrer">日本語</a>
              </span>
            </li>
          </ul>
          <p className="hero__route">
            国内用户走国内线路；海外访问请用{' '}
            <a href={LINKS.playIntl} target="_blank" rel="noopener noreferrer">
              GitHub Pages 国际线路
            </a>
            。
          </p>
        </div>

        <div className="hero__visual">
          <div className="hero__glow" aria-hidden="true" />
          <Zoomable className="hero__zoom" image={{ src: img('shots/board.webp'), alt: BOARD_ALT, width: 2000, height: 1250 }}>
            <BrowserFrame src={img('shots/board.webp')} width={2000} height={1250} eager alt={BOARD_ALT} />
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
            过路费 <b>+$1036</b>
          </div>
          <div className="chip chip--arch" aria-hidden="true">
            <span className="chip__icon tone-green">
              <CircleCheck size={15} />
            </span>
            架构生效 · 高可用入口
          </div>
          <div className="chip chip--event" aria-hidden="true">
            <span className="chip__icon tone-violet">
              <Gift size={15} />
            </span>
            re:Invent · Hackathon 拿了奖
          </div>
        </div>
      </div>
    </section>
  )
}
