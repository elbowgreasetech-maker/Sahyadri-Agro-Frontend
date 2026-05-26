import { useEffect } from 'react'

/**
 * Attaches an IntersectionObserver to all elements with [data-reveal]
 * inside the document. Call once per page-mount (in App or each Page).
 * Each element gets .revealed when it scrolls into view.
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/**
 * Animates a number from 0 → target when the element enters the viewport.
 * Usage: attach data-counter, data-target, data-suffix to element.
 */
export function useCounters() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-counter]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target
          const target = +el.dataset.target
          const suffix = el.dataset.suffix ?? '+'
          const dur = 1800
          const start = performance.now()
          const step = (now) => {
            const t = Math.min((now - start) / dur, 1)
            const ease = 1 - Math.pow(1 - t, 4)
            el.textContent = Math.round(ease * target) + suffix
            if (t < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
          obs.unobserve(el)
        })
      },
      { threshold: 0.3 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}
