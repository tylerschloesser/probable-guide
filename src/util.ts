import { MotionEntry } from './common'

export function calc_motion_window(
  motion: MotionEntry[],
  window_ms: number,
  now_ms: number,
) {
  let dp = 0
  let theta_sum = 0
  let count = 0
  for (let i = 0; i < motion.length - 2; i++) {
    const a = motion[i]
    const b = motion[i + 1]
    if (now_ms - b.timestamp > window_ms) {
      break
    }
    const dx = a.x - b.x
    const dy = a.y - b.y

    if (i === 0) {
      theta_sum += Math.atan2(dy, dx)
      count++
    }

    dp += Math.sqrt(dx * dx + dy * dy)
  }

  let theta: number | null = null
  if (count > 0) {
    theta = theta_sum / count
  }

  return { dp, theta }
}
