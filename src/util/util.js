export const getRandomTens = (min, max) => {
  const number = Math.random() * (max - min) + min
  return Math.ceil(number / 10) * 10
}

export const clearCanvas = canvas => {
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)
}
