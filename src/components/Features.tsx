import { FEATURES } from '../content'
import { Reveal, SectionHeading } from './ui'

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <SectionHeading
          eyebrow="Gameplay"
          title="不只是掷骰子买地"
          lead="规则借鉴经典地产桌游的轻松；计费、容灾、故障和账单，都来自云从业者的日常。"
        />
        <div className="features">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <Reveal key={f.title} delay={(i % 3) * 80} fill>
                <article className="feature">
                  <span className={`icon-tile tone-${f.tone}`}>
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
