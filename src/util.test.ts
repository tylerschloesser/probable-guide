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
  })
})
