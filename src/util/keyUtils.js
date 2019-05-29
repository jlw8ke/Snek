const KEY_CODES = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

export const getDirection = event => {
  switch (event.keyCode) {
    case KEY_CODES.LEFT:
      return "LEFT";
    case KEY_CODES.UP:
      return "UP";
    case KEY_CODES.RIGHT:
      return "RIGHT";
    case KEY_CODES.DOWN:
      return "DOWN";
    default:
      return undefined;
  }
};
