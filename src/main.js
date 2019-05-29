import '../styles/main.css'
import { createSnake } from "./snake";
import { clearCanvas } from "./util/canvasUtils";
import * as Controls from "./controller/controls";
import { createGameController } from "./controller/gameController";
import { createFood, hasSnakeEatenFood } from "./food";

const FPS = 30;
const canvas = document.getElementById("gameCanvas");

const snake = createSnake({ x: 100, y: 50, length: 5 });
Controls.setupControls();

let food = createFood(canvas, snake.snakeParts);

const gameController = createGameController(FPS, gameLoop);
gameController.start();

function gameLoop() {
  clearCanvas(canvas);
  if (hasSnakeEatenFood(snake, food)) {
    snake.expand();
    food = createFood(canvas, snake.snakeParts);
  }
  Controls.handleInput(snake);
  snake.move();
  food.draw(canvas);
  snake.draw(canvas);
}
