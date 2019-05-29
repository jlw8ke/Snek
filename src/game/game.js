import { Snake } from './snake'
import { getDirection } from './controls'
import { createFood } from './food'
import { CELL_SIZE, GREY } from '../constants'


const GameUtils = {
  hasSnakeEatenFood: (snake, food) => {
    const head = snake.snakeParts[0]
    return head.x === food.x && head.y === food.y;
  },
  createFood: (canvas, snake) =>
    createFood(
      canvas.width - CELL_SIZE,
      canvas.height - CELL_SIZE,
      snake.snakeParts
    )
}

export class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.inputQueue = []
    this.snake = new Snake({
      x: Math.floor(canvas.width / 2),
      y: Math.floor(canvas.height / 2)
    })

    this.food = GameUtils.createFood(this.canvas, this.snake)
  }

  onHandleControlEvent(event) {
    const direction = getDirection(event)
    this.inputQueue.push(direction)
  }

  update() {
    const hasEatenFood = GameUtils.hasSnakeEatenFood(this.snake, this.food)
    const direction = this.inputQueue.shift()
    this.snake.changeDirection(direction)
    this.snake.move(hasEatenFood)

    if (hasEatenFood) {
      this.food = GameUtils.createFood(this.canvas, this.snake)
    }

    if (
      this.snake.isDead(
        this.canvas.width - CELL_SIZE,
        this.canvas.height - CELL_SIZE
      )
    ) {
      this.gameOver = true
      this.snake.color = GREY
    }
  }

  draw() {
    this.snake.draw(this.canvas)
    this.food.draw(this.canvas)
  }
}
