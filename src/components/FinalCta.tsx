import { Play } from 'lucide-react'
import { LINKS, img } from '../content'
import { GithubMark, Reveal } from './ui'

export default function FinalCta() {
  return (
    <section className="section section--cta">
      <div className="container">
        <Reveal>
          <div className="cta-band">
            <div className="cta-band__copy">
              <h2>准备好成为云上大亨了吗？</h2>
              <p>打开浏览器，叫上一两位朋友，20 分钟后见分晓。</p>
              <div className="cta-band__actions">
                <a className="btn btn--primary btn--lg" href={LINKS.playCn} target="_blank" rel="noopener noreferrer">
                  <Play size={18} fill="currentColor" aria-hidden="true" />
                  立即开玩
                </a>
                <a className="btn btn--secondary btn--lg" href={LINKS.repo} target="_blank" rel="noopener noreferrer">
                  <GithubMark size={18} />
                  在 GitHub 上关注
                </a>
              </div>
              <p className="cta-band__route">
                海外访问请走{' '}
                <a href={LINKS.playIntl} target="_blank" rel="noopener noreferrer">
                  国际线路
                </a>
              </p>
            </div>
            <img
              className="cta-band__art"
              src={img('chars/yuki_run.webp')}
              width={518}
              height={560}
              loading="lazy"
              decoding="async"
              alt=""
              aria-hidden="true"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
