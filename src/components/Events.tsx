import { ArrowUpRight, FileText, PartyPopper, Presentation, Printer, Timer, Users } from 'lucide-react'
import { HANDBOOKS, LINKS, UG_PRESET, handbookUrl } from '../content'
import { Reveal, SectionHeading } from './ui'

export default function Events() {
  return (
    <section className="section section--soft" id="events">
      <div className="container">
        <SectionHeading
          eyebrow="Community"
          title="带去你的 User Group 活动"
          lead="线上联机、线下开黑都合适。开局页有专门给活动准备的「UG 活动局」，仓库里还有整套活动手册和实体版打印文件。"
        />

        <div className="events">
          <Reveal fill>
            <div className="ug-card">
              <span className="ug-card__badge">
                <Presentation size={15} aria-hidden="true" />
                开局页一键开局
              </span>
              <h3>UG 活动局</h3>
              <p>{UG_PRESET}</p>
              <ul className="ug-card__facts">
                <li>
                  <PartyPopper aria-hidden="true" />
                  娱乐模式 + 边玩边答题
                </li>
                <li>
                  <Timer aria-hidden="true" />
                  12 轮或 30 分钟，先到为准
                </li>
                <li>
                  <Users aria-hidden="true" />
                  4 人一桌
                </li>
              </ul>
              <div className="ug-card__actions">
                <a className="btn btn--primary" href={LINKS.playCn} target="_blank" rel="noopener noreferrer">
                  打开游戏开局页
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal fill delay={90}>
            <div className="handbooks">
              <div className="handbooks__head">
                <h3>常用手册（PDF）</h3>
                <a href={LINKS.handbookDir} target="_blank" rel="noopener noreferrer">
                  在 GitHub 查看全部
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
              <ol className="handbooks__list">
                {HANDBOOKS.map((h, i) => (
                  <li key={h.file}>
                    <a className="handbook" href={handbookUrl(h.file)} target="_blank" rel="noopener noreferrer">
                      <span className="handbook__num">{i + 1}</span>
                      <span className="handbook__text">
                        <b>{h.title}</b>
                        <small>{h.desc}</small>
                      </span>
                      {h.print ? (
                        <span className="handbook__tag">
                          <Printer size={13} aria-hidden="true" />
                          打印
                        </span>
                      ) : (
                        <FileText size={16} className="handbook__icon" aria-hidden="true" />
                      )}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
