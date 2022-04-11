const canvas = document.querySelector('canvas')!
const rect = canvas.getBoundingClientRect()
canvas.width = rect.width
canvas.height = rect.height

const context = canvas.getContext('2d')!

context.fillStyle = '#111'
context.fillRect(0, 0, canvas.width, canvas.height)
