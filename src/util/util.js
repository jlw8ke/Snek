export const getRandomTens = (min, max) => {
  const number = Math.random() * (max - min) + min;
  return Math.ceil(number / 10) * 10;
};
