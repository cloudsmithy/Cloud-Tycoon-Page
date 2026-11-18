import { Play } from 'lucide-react'
import { LINKS, img, linksFor } from '../content'
import { useI18n } from '../i18n'
import { GithubMark, Reveal, Rich } from './ui'

export default function FinalCta() {
  const { t, kw, lang } = useI18n()
  const L = linksFor(lang)
  return (
    <section className="section section--cta">
      <div className="container">
        <Reveal>
          <div className="cta-band">
            <div className="cta-band__copy">
              <h2>{kw(t('准备好成为云上大亨了吗？'))}</h2>
              <p>{t('打开浏览器，叫上一两位朋友，20 分钟后见分晓。')}</p>
              <div className="cta-band__actions">
                <a className="btn btn--primary btn--lg" href={L.play} target="_blank" rel="noopener noreferrer">
                  <Play size={18} fill="currentColor" aria-hidden="true" />
                  {t('立即开玩')}
                </a>
                <a className="btn btn--secondary btn--lg" href={LINKS.repo} target="_blank" rel="noopener noreferrer">
                  <GithubMark size={18} />
                  {t('在 GitHub 上关注')}
                </a>
              </div>
              <p className="cta-band__route">
                {lang === 'zh' ? (
                  <Rich text={t('海外访问请走 {0}')}>
                    <a href={L.playAlt} target="_blank" rel="noopener noreferrer">
                      {t('国际线路')}
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
