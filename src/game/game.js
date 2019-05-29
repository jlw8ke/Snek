import { Snake } from './snake'
import { getDirection } from './controls'
import { createFood } from './food'
import { CELL_SIZE } from '../constants'

export class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.inputQueue = []
    this.snake = new Snake({
      x: Math.floor(canvas.width / 2),
      y: Math.floor(canvas.height / 2)
    })

    this.food = createFood(
      this.canvas.width - CELL_SIZE,
      this.canvas.height - CELL_SIZE,
      this.snake.snakeParts
    )
  }

  onHandleControlEvent(event) {
    const direction = getDirection(event)
    this.inputQueue.push(direction)
  }

  update() {
    const direction = this.inputQueue.shift()
    this.snake.changeDirection(direction)
    this.snake.move()
  }

  draw() {
    this.snake.draw(this.canvas)
    this.food.draw(this.canvas)
  }
}
