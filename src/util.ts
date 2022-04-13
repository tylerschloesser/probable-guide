import { MotionEntry } from './common'

export function calc_motion_window(motion: MotionEntry[], window_ms: number) {
  if (motion.length < 2) {
    return {
      dx: 0,
      dy: 0,
    }
  }

  const start_ms = motion[0].timestamp
  let i = 1
  for (; i < motion.length; i++) {
    if (motion[i].timestamp - start_ms > window_ms) {
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
