import { getRandomTens } from '../util/util'
import { darkenColor } from '../util/colorUtils'
import { CELL_SIZE, RED } from '../constants'

class Food {
  constructor({ color = RED, x, y }) {
    this.color = color
    this.x = x
    this.y = y
  }

  draw(canvas) {
    const context = canvas.getContext('2d')
    context.fillStyle = this.color
    context.strokeStyle = darkenColor(this.color)
    context.fillRect(this.x, this.y, CELL_SIZE, CELL_SIZE)
    context.strokeRect(this.x, this.y, CELL_SIZE, CELL_SIZE)
  }
}

export const createFood = (maxX, maxY, invalidPositions = []) => {
  const x = getRandomTens(0, maxX)
  const y = getRandomTens(0, maxY)

  const isInvalid = invalidPositions.some(
    position => position.x === x && position.y === y
  )
  if (isInvalid) {
    return createFood(maxX, maxY, invalidPositions)
  }
  return new Food({ x, y })
}
