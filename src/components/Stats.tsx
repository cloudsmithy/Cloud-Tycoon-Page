import { STATS } from '../content'
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
  return (
    <div className="stats">
      <div className="container">
        <div className="stats__grid">
          {STATS.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </div>
  )
}
