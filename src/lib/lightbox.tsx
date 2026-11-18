import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { X } from 'lucide-react'

export interface ZoomImage {
  src: string
  alt: string
  width: number
  height: number
}

const LightboxContext = createContext<(image: ZoomImage) => void>(() => {})

/** 任意组件里调用 useLightbox()(image) 放大查看截图 */
export const useLightbox = () => useContext(LightboxContext)

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [image, setImage] = useState<ZoomImage | null>(null)
  const open = useCallback((next: ZoomImage) => setImage(next), [])
  return (
    <LightboxContext.Provider value={open}>
      {children}
      <Lightbox image={image} onClosed={() => setImage(null)} />
    </LightboxContext.Provider>
  )
}

function Lightbox({ image, onClosed }: { image: ZoomImage | null; onClosed: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog || !image) return
    if (!dialog.open) dialog.showModal()
    document.documentElement.classList.add('modal-open')
  }, [image])

  const close = () => ref.current?.close()

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={image?.alt ?? '图片'}
      onClose={() => {
        document.documentElement.classList.remove('modal-open')
        onClosed()
      }}
      // 点图片或遮罩任意位置都关闭，和常见的看图方式一致
      onClick={close}
    >
      {image && (
        <>
          <img src={image.src} alt={image.alt} width={image.width} height={image.height} />
          <p className="lightbox__caption">{image.alt}</p>
          <button type="button" className="icon-btn lightbox__close" onClick={close} aria-label="关闭图片">
            <X size={18} aria-hidden="true" />
          </button>
        </>
      )}
    </dialog>
  )
}
