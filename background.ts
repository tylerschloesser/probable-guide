import { random, times } from 'lodash'
import { visual_circle } from './src/common'

function generate(canvas: HTMLCanvasElement) {
  const base_r = Math.min(canvas.width, canvas.height) / 10

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
}

export function initBackground(canvas: HTMLCanvasElement) {
  const visual_circles: visual_circle[] = times(10, () => generate(canvas))
  return { visual_circles }
}

export function updateBackground(
  canvas: HTMLCanvasElement,
  visual_circles: visual_circle[],
  dt: number,
) {
  visual_circles.forEach((vc, i) => {
    vc.x = vc.x + (vc.vx * dt) / 1000
    vc.y = vc.y + (vc.vy * dt) / 1000

    if (
      vc.x < -vc.r ||
      vc.x > canvas.width + vc.r ||
      vc.y < -vc.r ||
      vc.y > canvas.height + vc.r
    ) {
      visual_circles[i] = generate(canvas)
    }
  })
}
