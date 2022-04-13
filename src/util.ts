import { MotionEntry } from './common'

export function calc_motion_window(motion: MotionEntry[], window_ms: number) {
  if (motion.length < 2) {
    return {
      dx: 0,
      dy: 0,
    }
  }
}
