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
}

const visual_circles = times(10, (i) => {
  const r = base_r + random(base_r / 4, base_r, true)
  const x = r + random(canvas.width - r * 2)
  const y = r + random(canvas.height - r * 2)
  const opacity = random(255).toString(16)
  const color = `#ff0000${opacity}`
  return <visual_circle>{ x, y, r, color }
})

function render(timestamp: number) {
  context.clearRect(9, 0, canvas.width, canvas.height)
  context.fillStyle = '#111'
  context.fillRect(0, 0, canvas.width, canvas.height)
  visual_circles.forEach(fill_circle)

  window.requestAnimationFrame(render)
}

window.requestAnimationFrame(render)
