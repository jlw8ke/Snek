import { getRandomTens } from "./util/util";
import { darkenColor } from "./util/colorUtils";
import { CELL_SIZE, RED } from "./constants";

export const createFood = (canvas, invalidPositions = []) => ({
  color: RED,
  position: setFoodPosition(canvas.width, canvas.height, invalidPositions),
  draw(canvas) {
    drawFood(canvas, this);
  }
});

const setFoodPosition = (width, height, invalidPositions) => {
  const x = getRandomTens(0, width - CELL_SIZE);
  const y = getRandomTens(0, height - CELL_SIZE);

  const isInvalidPosition = invalidPositions.some(
    position => position.x === x && position.y === y
  );
  if (isInvalidPosition) {
    return setFoodPosition(width, height);
  }
  return { x, y };
};

const drawFood = (canvas, food) => {
  const context = canvas.getContext("2d");
  context.fillStyle = food.color;
  context.strokestyle = darkenColor(food.color);
  context.fillRect(food.position.x, food.position.y, CELL_SIZE, CELL_SIZE);
  context.strokeRect(food.position.x, food.position.y, CELL_SIZE, CELL_SIZE);
};

export const hasSnakeEatenFood = (snake, food) => {
  const head = snake.snakeParts[0];
  return head.x === food.position.x && head.y === food.position.y;
};
