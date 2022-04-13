import { MotionEntry } from './common'

export function calc_motion_window(motion: MotionEntry[], window_ms: number) {
  if (motion.length < 2) {
    return {
      dx: 0,
      dy: 0,
    }
  }

  const a = motion[0]
  const b = motion[motion.length - 1]

  return {
    dx: Math.abs(a.x - b.x),
    dy: Math.abs(a.x - b.x),
  }
}
