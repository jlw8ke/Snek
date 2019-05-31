import { GREEN, CELL_SIZE } from '../constants'
import { darkenColor } from '../util/util'

export class Snake {
  constructor({ color = GREEN, x, y, length = 5 } = {}) {
    this.color = color
    this.position = { x, y }
    this.snakeParts = generateStartingPosition({ x, y, length })
    this.movement = { dx: 0, dy: 0 }
  }

  draw(canvas) {
    const context = canvas.getContext('2d')
    this.snakeParts.forEach(part => {
      context.fillStyle = this.color
      context.strokeStyle = darkenColor(this.color)
      context.fillRect(part.x, part.y, CELL_SIZE, CELL_SIZE)
      context.strokeRect(part.x, part.y, CELL_SIZE, CELL_SIZE)
    })
  }

  move(hasEatenFood = false) {
    if (this.movement.dx === 0 && this.movement.dy === 0) {
      return
    }

    const head = this.snakeParts[0]
    const newHead = {
      x: head.x + this.movement.dx,
      y: head.y + this.movement.dy
    }

    this.snakeParts.unshift(newHead)
    if (!hasEatenFood) {
      this.snakeParts.pop()
    }
  }

  changeDirection(direction) {
    const validDirections = {
      LEFT: ['UP', 'DOWN'],
      RIGHT: ['UP', 'DOWN'],
      UP: ['LEFT', 'RIGHT'],
      DOWN: ['LEFT', 'RIGHT']
    }

    const canChangeDirection =
      !this.currentDirection ||
      (this.currentDirection &&
        validDirections[this.currentDirection].includes(direction))

    if (canChangeDirection) {
      switch (direction) {
        case 'LEFT': {
          this.movement.dx = -1 * CELL_SIZE
          this.movement.dy = 0
          break
        }
        case 'UP': {
          this.movement.dx = 0
          this.movement.dy = -1 * CELL_SIZE
          break
        }
        case 'RIGHT': {
          this.movement.dx = CELL_SIZE
          this.movement.dy = 0
          break
        }
        case 'DOWN': {
          this.movement.dx = 0
          this.movement.dy = CELL_SIZE
          break
        }
        default:
          break
      }
      this.currentDirection = direction
    }
  }

  isDead(maxX, maxY) {
    const head = this.snakeParts[0]
    const isOutOfBounds =
      head.x < 0 || head.x > maxX || head.y < 0 || head.y > maxY
    return (
      isOutOfBounds ||
      this.snakeParts.some(
        part => part !== head && part.x === head.x && part.y === head.y
      )
    )
  }
}

const generateStartingPosition = ({ x, y, length }) => {
  const snakeParts = []
  for (let i = 0; i < length; i++) {
    const snakePart = { x: x - CELL_SIZE * i, y }
    snakeParts.push(snakePart)
  }
  return snakeParts
}
