import { MotionEntry } from './common'

export function calc_motion_window(
  motion: MotionEntry[],
  window_ms: number,
  now_ms: number,
) {
  let dp = 0
  for (let i = 0; i < motion.length - 2; i++) {
    const a = motion[i]
    const b = motion[i + 1]
    if (now_ms - b.timestamp > window_ms) {
      break
    }
    const dx = a.x - b.x
    const dy = a.y - b.y
    dp += Math.sqrt(dx * dx + dy * dy)
  }
  return { dp }
}
