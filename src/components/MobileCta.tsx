import { CirclePlay, Play } from 'lucide-react'
import { LINKS, VIDEOS } from '../content'
import { useScrolled } from '../lib/hooks'
import { useVideo } from '../lib/video'

/** 手机上划过首屏以后，底部常驻「立即开玩」，不用再滚回顶部 */
export default function MobileCta() {
  const show = useScrolled(640)
  const openVideo = useVideo()
  const tab = show ? undefined : -1

  return (
    <div className={`mobile-cta${show ? ' is-visible' : ''}`} aria-hidden={!show}>
      <a className="btn btn--primary" href={LINKS.playCn} target="_blank" rel="noopener noreferrer" tabIndex={tab}>
        <Play size={16} fill="currentColor" aria-hidden="true" />
        立即开玩
      </a>
      <button type="button" className="btn btn--secondary" onClick={() => openVideo(VIDEOS.trailer)} tabIndex={tab}>
        <CirclePlay size={17} aria-hidden="true" />
        看宣传片
      </button>
    </div>
  )
}
