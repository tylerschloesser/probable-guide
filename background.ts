import { random, times } from 'lodash'
import { visual_circle } from './src/common'

export function initBackground(canvas: HTMLCanvasElement) {
  const base_r = Math.min(canvas.width, canvas.height) / 10

  const visual_circles: visual_circle[] = times(10, () => {
    const r = base_r + random(base_r / 4, base_r, true)
    const x = r + random(canvas.width - r * 2)
    const y = r + random(canvas.height - r * 2)
    let opacity = random(16).toString(16)
    if (opacity.length === 1) {
      opacity = `0${opacity}`
    }
    const color = `#ff0000${opacity}`
    const speed = random(r / 128, r, true)
    const angle = random(Math.PI * 2, true)
    const vx = Math.cos(angle) * speed
    const vy = Math.sin(angle) * speed
    return { x, y, r, color, vx, vy }
  })

  return { visual_circles }
}

export function updateBackground(visual_circles: visual_circle[], dt: number) {}
