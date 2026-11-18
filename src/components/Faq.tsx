import { ArrowUpRight, Plus } from 'lucide-react'
import { FAQ } from '../content'
import { Reveal, SectionHeading } from './ui'

export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container faq-wrap">
        <SectionHeading eyebrow="FAQ" title="常见问题" />
        <Reveal>
          <div className="faq">
            {FAQ.map((item) => (
              <details key={item.q} className="faq__item">
                <summary className="faq__q">
                  <span>{item.q}</span>
                  <Plus size={18} aria-hidden="true" />
                </summary>
                <div className="faq__a">
                  <p>{item.a}</p>
                  {item.link && (
                    <a href={item.link.href} target="_blank" rel="noopener noreferrer">
                      {item.link.label}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
