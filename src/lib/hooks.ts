import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'

/** 服务端渲染时没有 layout effect，用普通 effect 代替，避免警告 */
export const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export type RevealPhase = 'idle' | 'pending' | 'shown'

/**
 * 首屏以下的元素滚到视口时淡入。
 * 预渲染的 HTML 默认全部可见；只有确认元素在首屏以下、浏览器支持 IntersectionObserver、
 * 用户没开「减少动态效果」时才先隐藏，所以爬虫、无 JS、打印时内容都完整。
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [phase, setPhase] = useState<RevealPhase>('idle')

  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return
    setPhase('pending')
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPhase('shown')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { ref, phase }
}

/** 数字滚到视口时从 0 跳到目标值；首屏可见或减少动态效果时直接显示目标值 */
export function useCountUp<T extends HTMLElement>(target: number, duration = 1100) {
  const ref = useRef<T>(null)
  const [value, setValue] = useState(target)

  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) return
    setValue(0)
    let raf = 0
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          setValue(Math.round(target * (1 - Math.pow(1 - p, 3))))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target, duration])

  return { ref, value }
}

/** 页面滚动超过阈值后为 true */
export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

/** 当前滚动到的小节 id，用于导航高亮 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState('')
  useEffect(() => {
    let raf = 0
    const update = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        let current = ''
        for (const id of ids) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= 160) current = id
        }
        setActive(current)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids])
  return active
}

/** 选项卡的键盘操作：方向键切换，Home / End 跳到首尾 */
export function handleTabKeys(e: KeyboardEvent<HTMLElement>, index: number, count: number, select: (i: number) => void) {
  let next = -1
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % count
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index - 1 + count) % count
  else if (e.key === 'Home') next = 0
  else if (e.key === 'End') next = count - 1
  if (next < 0) return
  e.preventDefault()
  select(next)
  e.currentTarget.parentElement?.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus()
}
