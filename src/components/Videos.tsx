import { ChevronRight, Layers, Play } from 'lucide-react'
import { VIDEOS, img } from '../content'
import { useVideo } from '../lib/video'
import { Reveal, SectionHeading } from './ui'

export default function Videos() {
  const openVideo = useVideo()
  const trailer = VIDEOS.trailer

  return (
    <section className="section" id="videos">
      <div className="container">
        <SectionHeading
          eyebrow="Trailer"
          title="三分钟，看一场云上大冒险"
          lead="序章「韩叔的出师考」拉开大幕，四位 UG 伙伴买服务、搭架构、争夺冠军奖杯，片尾还藏着一个彩蛋。"
        />

        <div className="videos">
          <Reveal>
            <div className="poster-card">
              <button
                type="button"
                className="poster"
                onClick={() => openVideo(trailer)}
                aria-label={`播放${trailer.title}，时长 ${trailer.duration}`}
              >
                <img
                  src={img('cover.webp')}
                  width={1600}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  alt="云上大亨宣传片封面：四位卡通角色在云服务棋盘上争夺 User Group 冠军奖杯"
                />
                <span className="poster__play" aria-hidden="true">
                  <Play size={30} fill="currentColor" />
                </span>
              </button>
              <div className="poster-card__meta">
                <div>
                  <b>{trailer.title}</b>
                  <span>{trailer.note}</span>
                </div>
                <span className="duration">{trailer.duration}</span>
              </div>
            </div>
          </Reveal>

          <div className="video-list">
            {[VIDEOS.teaser, VIDEOS.guide].map((v, i) => (
              <Reveal key={v.id} delay={i * 80} fill>
                <button type="button" className="video-item" onClick={() => openVideo(v)}>
                  <span className="video-item__icon tone-orange">
                    <Play size={18} fill="currentColor" aria-hidden="true" />
                  </span>
                  <span className="video-item__text">
                    <b>{v.title}</b>
                    <small>{v.note}</small>
                  </span>
                  <span className="duration">{v.duration}</span>
                </button>
              </Reveal>
            ))}
            <Reveal delay={160} fill>
              <a className="video-item" href="#modes">
                <span className="video-item__icon tone-violet">
                  <Layers size={18} aria-hidden="true" />
                </span>
                <span className="video-item__text">
                  <b>6 个模式的玩法讲解</b>
                  <small>每个一两分钟，挑一个最对胃口的</small>
                </span>
                <ChevronRight size={18} aria-hidden="true" className="video-item__chev" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
