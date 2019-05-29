import { darkenColor } from "./util/colorUtils";
import { GREEN, CELL_SIZE } from "./constants";

const generateStartingPosition = (snake, { x, y, length }) => {
  for (let i = 0; i < length; i++) {
    let snakePart = { x: x - CELL_SIZE * i, y };
    snake.snakeParts.push(snakePart);
  }
};

const drawSnakePart = (context, color, snakePart) => {
  context.fillStyle = color;
  context.strokeStyle = darkenColor(color);

  context.fillRect(snakePart.x, snakePart.y, CELL_SIZE, CELL_SIZE);

  context.strokeRect(snakePart.x, snakePart.y, CELL_SIZE, CELL_SIZE);
};

const drawSnake = (canvas, snake) => {
  const context = canvas.getContext("2d");
  snake.snakeParts.forEach(part => drawSnakePart(context, snake.color, part));
};

export const createSnake = ({ x, y, length }) => {
  const snake = {
    color: GREEN,
    snakeParts: [],
    movement: { dx: 0, dy: 0 },
    draw(canvas) {
      drawSnake(canvas, this);
    },
    move() {
      if (this.movement.dx === 0 && this.movement.dy === 0) return;

      const head = this.snakeParts[0];
      const newHead = {
        x: head.x + this.movement.dx,
        y: head.y + this.movement.dy
      };

      this.snakeParts.unshift(newHead);
      this.snakeParts.pop();
    },
    expand() {},
    changeDirection(direction) {
      const validDirections = {
        LEFT: ["UP", "DOWN"],
        RIGHT: ["UP", "DOWN"],
        UP: ["LEFT", "RIGHT"],
        DOWN: ["LEFT", "RIGHT"]
      };

      const canChangeDirection =
        this.currentDirection &&
        validDirections[this.currentDirection].includes(direction);

      if (!this.currentDirection || canChangeDirection) {
        switch (direction) {
          case "LEFT": {
            this.movement.dx = -1 * CELL_SIZE;
            this.movement.dy = 0;
            break;
          }
          case "UP": {
            this.movement.dx = 0;
            this.movement.dy = -1 * CELL_SIZE;
            break;
          }
          case "RIGHT": {
            this.movement.dx = CELL_SIZE;
            this.movement.dy = 0;
            break;
          }
          case "DOWN": {
            this.movement.dx = 0;
            this.movement.dy = CELL_SIZE;
            break;
          }
        }
        this.currentDirection = direction;
      }
      this.isChangingDirection = false;
    }
  };

  generateStartingPosition(snake, { x, y, length });
  return snake;
};
