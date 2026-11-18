import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { ExternalLink, LoaderCircle, X } from 'lucide-react'
import type { VideoItem } from '../content'

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

  return (
    <dialog
      ref={ref}
      className="video-modal"
      aria-label={video?.title ?? '视频'}
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
              <h3>{video.title}</h3>
              <span>
                {video.duration}
                {video.note ? ` · ${video.note}` : ''}
              </span>
            </div>
            <a className="btn btn--ghost btn--sm" href={video.src} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={15} aria-hidden="true" />
              新窗口打开
            </a>
            <button type="button" className="icon-btn" onClick={close} aria-label="关闭视频">
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <div className="video-modal__stage">
            {!loaded && (
              <div className="video-modal__loading" role="status">
                <LoaderCircle className="spin" size={30} aria-hidden="true" />
                <span>视频加载中…</span>
              </div>
            )}
            <iframe
              key={video.id}
              src={video.src}
              title={video.title}
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
