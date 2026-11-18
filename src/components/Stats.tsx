import { STATS } from '../content'
import { useI18n } from '../i18n'
import { useCountUp } from '../lib/hooks'

function Stat({ value, label }: { value: number; label: string }) {
  const { ref, value: shown } = useCountUp<HTMLDivElement>(value)
  return (
    <div className="stat" ref={ref}>
      <span className="stat__num">{shown}</span>
      <span className="stat__label">{label}</span>
    </div>
  )
}

export default function Stats() {
  const { t } = useI18n()
  return (
    <div className="stats">
      <div className="container">
        <div className="stats__grid">
          {STATS.map((s) => (
            <Stat key={s.label} value={s.value} label={t(s.label)} />
          ))}
        </div>
      </div>
    </div>
  )
}
