import { initBackground, updateBackground } from '../background'
import { MotionEntry } from './common'
import { calc_motion_window } from './util'

const canvas = document.querySelector('canvas')!
const rect = canvas.getBoundingClientRect()
canvas.width = rect.width
canvas.height = rect.height

const context = canvas.getContext('2d')!

let mousedown = false
let motion: MotionEntry[] = []

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

const { visual_circles } = initBackground(canvas)

let last_timestamp = 0
function render(timestamp: number) {
  const dt = timestamp - last_timestamp
  last_timestamp = timestamp

  context.clearRect(9, 0, canvas.width, canvas.height)
  context.fillStyle = '#111'
  context.fillRect(0, 0, canvas.width, canvas.height)
  updateBackground(canvas, visual_circles, dt)
  visual_circles.forEach(fill_circle)

  motion = motion.filter((m) => timestamp - m.timestamp < 1000)

  if (mousedown) {
    context.strokeStyle = 'blue'
    context.beginPath()
    for (let i = 0; i < motion.length - 1; i++) {
      const a = motion[i]
      const b = motion[i + 1]
      context.moveTo(a.x, a.y)
      context.lineTo(b.x, b.y)
    }
    context.stroke()
    context.closePath()
  }

  if (motion.length > 1) {
    context.strokeStyle = 'lightblue'
    context.beginPath()
    const a = motion[0]
    const b = motion[motion.length - 1]
    context.moveTo(a.x, a.y)
    context.lineTo(b.x, b.y)
    context.stroke()
    context.closePath()
  }

  const box_h = 40
  const box_w = box_h * 5
  const { dp, theta } = calc_motion_window(motion, 500, timestamp)
  const perc = Math.min(dp / Math.max(canvas.width, canvas.height), 1)
  context.beginPath()
  context.fillStyle = 'green'
  context.fillRect(0, canvas.height - box_h, box_w * perc, box_h)
  context.strokeStyle = 'white'
  context.strokeRect(0, canvas.height - box_h, box_w, box_h)
  context.closePath()

  context.fillStyle = 'white'
  context.font = '20px serif'
  context.fillText(theta ? theta.toFixed(2) : 'null', 0, 20)

  const r = 100
  context.beginPath()
  context.arc(r, canvas.height - box_h - r, r, 0, Math.PI * 2)
  if (theta !== null) {
    context.moveTo(r, canvas.height - box_h - r)
    const to_x = Math.cos(theta) * r
    const to_y = Math.sin(theta) * r
    context.lineTo(r + to_x, canvas.height - box_h - r + to_y)
  }
  context.stroke()
  context.closePath()

  window.requestAnimationFrame(render)
}

window.requestAnimationFrame(render)

canvas.addEventListener('mousemove', (e) => {
  motion.unshift({ x: e.x, y: e.y, timestamp: e.timeStamp })
})

canvas.addEventListener('mousedown', () => {
  mousedown = true
})

canvas.addEventListener('mouseleave', () => {
  mousedown = false
})

canvas.addEventListener('mouseup', () => {
  mousedown = false
})
