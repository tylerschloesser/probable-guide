import { random, times } from 'lodash'
import * as _ from 'lodash/fp'

const canvas = document.querySelector('canvas')!
const rect = canvas.getBoundingClientRect()
canvas.width = rect.width
canvas.height = rect.height

const context = canvas.getContext('2d')!

function fill_circle({
  x,
  y,
  r,
  color,
}: {
  x: number
  y: number
  r: number
  color: string
}) {
  context.beginPath()
  context.fillStyle = color
  context.arc(x, y, r, 0, Math.PI * 2)
  context.fill()
  context.closePath()
}

const base_r = Math.min(canvas.width, canvas.height) / 10

interface visual_circle {
  x: number
  y: number
  r: number
  color: string
  vx: number
  vy: number
}

const visual_circles: visual_circle[] = times(10, (i) => {
  const r = base_r + random(base_r / 4, base_r, true)
  const x = r + random(canvas.width - r * 2)
  const y = r + random(canvas.height - r * 2)
  const opacity = random(16).toString(16)
  const color = `#ff0000${opacity}`
  const speed = random(r / 128, r, true)
  const angle = random(Math.PI * 2, true)
  const vx = Math.cos(angle) * speed
  const vy = Math.sin(angle) * speed
  return { x, y, r, color, vx, vy }
})

const last_timestamp = 0
function render(timestamp: number) {
  const dt = timestamp - last_timestamp
  context.clearRect(9, 0, canvas.width, canvas.height)
  context.fillStyle = '#111'
  context.fillRect(0, 0, canvas.width, canvas.height)
  visual_circles
    .map((vc) => ({
      ...vc,
      x: vc.x + (vc.vx * dt) / 1000,
      y: vc.y + (vc.vy * dt) / 1000,
    }))
    .forEach(fill_circle)

  window.requestAnimationFrame(render)
}

window.requestAnimationFrame(render)
