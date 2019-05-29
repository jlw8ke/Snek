export const createGameController = (fps, gameLoop) => {
  const delay = 1000 / fps;
  let time;
  let frame = -1;

  function loop(timestamp) {
    if (!time) time = timestamp;
    const segment = Math.floor((timestamp - time) / delay);
    if (segment > frame) {
      frame = segment;
      gameLoop();
    }
    requestAnimationFrame(loop);
  }

  return {
    isPlaying: false,
    start() {
      if (!this.isPlaying) {
        this.isPlaying = true;
        requestAnimationFrame(loop);
      }
    }
  };
};
