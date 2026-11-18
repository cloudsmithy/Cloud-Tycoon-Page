import { Fragment, useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { ARCHS, img } from '../content'
import { handleTabKeys } from '../lib/hooks'

/** 用游戏自带的亚马逊云科技官方架构图标，画几套示例架构 */
export default function ArchDiagram() {
  const [index, setIndex] = useState(0)
  const arch = ARCHS[index]

  return (
    <div className="arch">
      <div className="arch__tabs" role="tablist" aria-label="示例架构">
        {ARCHS.map((a, i) => (
          <button
            key={a.name}
            type="button"
            role="tab"
            id={`arch-tab-${i}`}
            aria-selected={i === index}
            aria-controls="arch-panel"
            tabIndex={i === index ? 0 : -1}
            className="arch__tab"
            onClick={() => setIndex(i)}
            onKeyDown={(e) => handleTabKeys(e, i, ARCHS.length, setIndex)}
          >
            {a.name}
          </button>
        ))}
      </div>

      <div className="arch__panel" role="tabpanel" id="arch-panel" aria-labelledby={`arch-tab-${index}`}>
        <div className="arch__meta">
          <span className="arch__cat">{arch.category}</span>
          <span className="arch__count">
            必须 {arch.required} 块 · 可选 {arch.optional} 块
          </span>
        </div>

        <div className="arch__flow">
          {arch.flow.map((node, i) => (
            <Fragment key={`${arch.name}-${node.icon}-${i}`}>
              {i > 0 && <ArrowRight className="arch__arrow" size={18} aria-hidden="true" />}
              <div className={`arch__node${node.optional ? ' is-optional' : ''}`}>
                {node.optional && <em>可选</em>}
                <img src={img(`aws/${node.icon}.svg`)} width={44} height={44} alt="" />
                <b>{node.label}</b>
                {node.alt && <small>{node.alt}</small>}
              </div>
            </Fragment>
          ))}
        </div>

        <p className="arch__desc">{arch.desc}</p>
        {arch.perk && (
          <p className="arch__perk">
            <Sparkles size={15} aria-hidden="true" />
            <span>
              <b>游戏里：</b>
              {arch.perk}
            </span>
          </p>
        )}
      </div>
    </div>
  )
}
