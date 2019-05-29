export const darkenColor = (color, amount = -50) => {
  const colorCode = color.slice(1);

  let red = Math.min(255, parseInt(colorCode.slice(0, 2), 16) + amount);
  let green = Math.min(255, parseInt(colorCode.slice(2, 4), 16) + amount);
  let blue = Math.min(255, parseInt(colorCode.slice(4, 6), 16) + amount);

  const darkenedColor = [red, green, blue].reduce((color, val) => {
    color += val.toString(16);
    return color;
  }, "#");
  return darkenedColor;
};
