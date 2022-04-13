import { MotionEntry } from './common'

export function calc_motion_window(
  motion: MotionEntry[],
  window_ms: number,
  now_ms: number,
) {
  if (motion.length < 2) {
    return {
      dx: 0,
      dy: 0,
    }
  }

  let i = 1
  for (; i < motion.length; i++) {
    if (now_ms - motion[i].timestamp > window_ms) {
      break
    }
  }

  const a = motion[0]
  const b = motion[i - 1]

  return {
    dx: Math.abs(a.x - b.x),
    dy: Math.abs(a.y - b.y),
  }
}
