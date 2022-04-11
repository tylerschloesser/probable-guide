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

const r = Math.min(canvas.width, canvas.height) / 4
fill_circle({ r, x: canvas.width / 2, y: canvas.height / 2, color: 'pink' })
