import { ArrowUpRight, Quote } from 'lucide-react'
import { AUTHOR_NOTE, PARTNERS, img } from '../content'
import { useI18n } from '../i18n'
import { Reveal, ZhOnly } from './ui'

export default function AuthorNote() {
  const { t, kw } = useI18n()
  return (
    <section className="section" id="story">
      <div className="container">
        <Reveal>
          <figure className="story">
            <span className="story__mark" aria-hidden="true">
              <Quote size={28} />
            </span>
            <p className="eyebrow">Behind the game</p>
            <h2 className="story__title">{t('作者寄语')}</h2>
            <blockquote className="story__quote">
              {AUTHOR_NOTE.paragraphs.map((p) => (
                <p key={p.slice(0, 12)}>{kw(t(p))}</p>
              ))}
            </blockquote>
            <figcaption className="story__sign">
              <span className="story__faces" aria-hidden="true">
                {PARTNERS.map((p) => (
                  <img key={p.name} src={img(p.img)} width={p.width} height={p.height} alt="" loading="lazy" decoding="async" />
                ))}
              </span>
              <span>—— {kw(t(AUTHOR_NOTE.signature))}</span>
            </figcaption>
            <a className="story__more" href={AUTHOR_NOTE.href} target="_blank" rel="noopener noreferrer">
              {t('阅读完整的作者寄语')}
              <ZhOnly />
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
