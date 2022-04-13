import { calc_motion_window } from './util'

describe('util', () => {
  describe('calc_motion_window', () => {
    test('empty motion', () => {
      expect(calc_motion_window([], 0)).toEqual({ dx: 0, dy: 0 })
    })
    test('one motion', () => {
      expect(calc_motion_window([{ x: 1, y: 1, timestamp: 1 }], 0)).toEqual({
        dx: 0,
        dy: 0,
      })
    })

    test('two motions', () => {
      const motion = []
      motion.push({ x: 1, y: 1, timestamp: 1 })
      motion.push({ x: 2, y: 2, timestamp: 2 })
      expect(calc_motion_window(motion, 0)).toEqual({
        dx: 1,
        dy: 1,
      })
    })

    test('two motions (negative)', () => {
      const motion = []
      motion.push({ x: 2, y: 2, timestamp: 1 })
      motion.push({ x: 1, y: 1, timestamp: 2 })
      expect(calc_motion_window(motion, 0)).toEqual({
        dx: 1,
        dy: 1,
      })
    })
  })
})
