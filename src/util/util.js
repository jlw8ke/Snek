export const getRandomTens = (min, max) => {
  const number = Math.random() * (max - min) + min
  return Math.ceil(number / 10) * 10
}

export const clearCanvas = canvas => {
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)
}

export const darkenColor = (color, amount = -50) => {
  const colorCode = color.slice(1)

  const red = Math.min(255, parseInt(colorCode.slice(0, 2), 16) + amount)
  const green = Math.min(255, parseInt(colorCode.slice(2, 4), 16) + amount)
  const blue = Math.min(255, parseInt(colorCode.slice(4, 6), 16) + amount)

  const darkenedColor = [red, green, blue].reduce((col, val) => {
    col += val.toString(16)
    return col
  }, '#')
  return darkenedColor
}
