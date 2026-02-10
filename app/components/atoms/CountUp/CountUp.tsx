import { useCountUp } from '~/utils/countUp'

type Formatter = (value: number) => string

type CountUpProps = {
  end: number
  duration?: number
  formatter?: Formatter
}

const defaultFormatter: Formatter = (v) =>
  v.toLocaleString(undefined, { maximumFractionDigits: 0 })

/**
 * Animates counting from 0 to end over the given duration (in seconds).
 * Uses the shared useCountUp hook; safe for SSR (renders final value on server).
 */
export function CountUp({
  end,
  duration = 3,
  formatter = defaultFormatter,
}: CountUpProps) {
  const durationMs = duration * 1000
  const value = useCountUp(end, durationMs)
  return <>{formatter(value)}</>
}
