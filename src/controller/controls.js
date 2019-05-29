import { getDirection } from "../util/keyUtils";

let inputs = [];

export function setupControls() {
  document.addEventListener("keydown", event => {
    const direction = getDirection(event);
    inputs.push(direction);
  });
}

export function handleInput(snake) {
  const direction = inputs.shift();
  snake.changeDirection(direction);
}

export const clearInputs = () => (inputs = []);
