import { useEffect, useState } from 'react'

/** Ease-out cubic: fast start, slow end */
function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

/**
 * Returns a number that animates from 0 to end over the given duration.
 * Safe for SSR: returns end on the server so the initial render shows the final value.
 */
export function useCountUp(end: number, durationMs: number): number {
  const [value, setValue] = useState(end)

  useEffect(() => {
    if (typeof window === 'undefined') return
    let startTime: number
    let rafId: number

    const tick = (now: number) => {
      if (startTime === undefined) startTime = now
      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / durationMs)
      const eased = easeOutCubic(progress)
      setValue(eased * end)
      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      }
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [end, durationMs])

  return value
}
