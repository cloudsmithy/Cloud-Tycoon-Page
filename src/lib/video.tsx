import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { ExternalLink, LoaderCircle, X } from 'lucide-react'
import type { VideoItem } from '../content'
import { useI18n } from '../i18n'

const VideoContext = createContext<(video: VideoItem) => void>(() => {})

/** 任意组件里调用 useVideo()(item) 打开视频弹窗 */
export const useVideo = () => useContext(VideoContext)

export function VideoProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<VideoItem | null>(null)
  const open = useCallback((video: VideoItem) => setCurrent(video), [])
  return (
    <VideoContext.Provider value={open}>
      {children}
      <VideoModal video={current} onClosed={() => setCurrent(null)} />
    </VideoContext.Provider>
  )
}

function VideoModal({ video, onClosed }: { video: VideoItem | null; onClosed: () => void }) {
  const { t, tf, lang } = useI18n()
  const ref = useRef<HTMLDialogElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog || !video) return
    setLoaded(false)
    if (!dialog.open) dialog.showModal()
    document.documentElement.classList.add('modal-open')
  }, [video])

  const close = () => ref.current?.close()
  const title = video ? t(video.title) : t('视频')

  return (
    <dialog
      ref={ref}
      className="video-modal"
      aria-label={title}
      onClose={() => {
        document.documentElement.classList.remove('modal-open')
        onClosed()
      }}
      onClick={(e) => {
        // 点到弹窗外面的遮罩时关闭
        if (e.target === e.currentTarget) close()
      }}
    >
      {video && (
        <div className="video-modal__inner">
          <div className="video-modal__head">
            <div className="video-modal__title">
              <h3>
                {title}
                {lang !== 'zh' && <span className="lang-badge">{t('中文')}</span>}
              </h3>
              <span>
                {video.duration}
                {video.note ? ` · ${t(video.note)}` : ''}
              </span>
            </div>
            <a className="btn btn--ghost btn--sm" href={video.src} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={15} aria-hidden="true" />
              {t('新窗口打开')}
            </a>
            <button type="button" className="icon-btn" onClick={close} aria-label={t('关闭视频')}>
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <div className="video-modal__stage">
            {!loaded && (
              <div className="video-modal__loading" role="status">
                <LoaderCircle className="spin" size={30} aria-hidden="true" />
                <span>{t('视频加载中…')}</span>
                {video.size && <small>{tf('首次打开需要下载{0}，之后会快很多', t(video.size))}</small>}
              </div>
            )}
            <iframe
              key={video.id}
              src={video.src}
              title={title}
              allow="autoplay; fullscreen"
              allowFullScreen
              onLoad={() => setLoaded(true)}
            />
          </div>
        </div>
      )}
    </dialog>
  )
}
