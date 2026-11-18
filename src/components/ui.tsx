import { useId, type CSSProperties, type ReactNode } from 'react'
import { Lock, ZoomIn } from 'lucide-react'
import { useReveal } from '../lib/hooks'
import { useLightbox, type ZoomImage } from '../lib/lightbox'
import { keepWords } from '../lib/text'

/** 滚动淡入容器；fill 让它在网格里撑满高度 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  fill = false,
}: {
  children: ReactNode
  delay?: number
  className?: string
  fill?: boolean
}) {
  const { ref, phase } = useReveal<HTMLDivElement>()
  const classes = ['reveal', fill && 'reveal--fill', phase !== 'idle' && `is-${phase}`, className]
    .filter(Boolean)
    .join(' ')
  const style: CSSProperties | undefined = phase === 'shown' && delay ? { transitionDelay: `${delay}ms` } : undefined
  return (
    <div ref={ref} className={classes} style={style}>
      {children}
    </div>
  )
}

export function SectionHeading({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{keepWords(title)}</h2>
      {lead && <p className="lead">{keepWords(lead)}</p>}
    </Reveal>
  )
}

/** 浏览器窗口外框，用来放游戏截图 */
export function BrowserFrame({
  src,
  alt,
  width,
  height,
  url = 'aws-game.usergroup.cn',
  eager = false,
}: {
  src: string
  alt: string
  width: number
  height: number
  url?: string
  eager?: boolean
}) {
  return (
    <figure className="frame">
      <div className="frame__bar" aria-hidden="true">
        <span className="frame__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="frame__url">
          <Lock size={11} />
          {url}
        </span>
        <span className="frame__spacer" />
      </div>
      <img src={src} alt={alt} width={width} height={height} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </figure>
  )
}

/** 点击放大查看截图；按钮的可读名称来自里面图片的 alt */
export function Zoomable({ image, className = '', children }: { image: ZoomImage; className?: string; children: ReactNode }) {
  const zoom = useLightbox()
  return (
    <button type="button" className={`zoomable ${className}`.trim()} onClick={() => zoom(image)} title="点击放大">
      {children}
      <span className="zoomable__hint" aria-hidden="true">
        <ZoomIn size={16} />
      </span>
    </button>
  )
}

export function LogoMark({ size = 32 }: { size?: number }) {
  const id = `logo-${useId().replace(/:/g, '')}`
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="logo-mark">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffb547" />
          <stop offset="1" stopColor="#ff6a00" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill={`url(#${id})`} />
      <path
        transform="translate(12 13) scale(1.6667)"
        d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
        fill="#fff"
      />
    </svg>
  )
}

export function GithubMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}
