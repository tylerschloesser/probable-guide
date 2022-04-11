import { random, times } from 'lodash'
import * as _ from 'lodash/fp'

const canvas = document.querySelector('canvas')!
const rect = canvas.getBoundingClientRect()
canvas.width = rect.width
canvas.height = rect.height

const context = canvas.getContext('2d')!

context.fillStyle = '#111'
context.fillRect(0, 0, canvas.width, canvas.height)

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

times(10, (i) => {
  const r = base_r + random(base_r / 4, base_r, true)
  const x = r + random(canvas.width - r * 2)
  const y = r + random(canvas.height - r * 2)
  fill_circle({ r, x, y, color: 'pink' })
})
