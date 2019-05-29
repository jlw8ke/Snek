import config from './config.json'

const DELAY = 1000 / config.FPS

export const createGameLoop = (canvas, { update, draw }) => {
  let lastRender
  let lastProgress = -1

  function gameLoop() {
    update()
    draw(canvas)
  }

  function loop(timestamp) {
    if (!lastRender) {
      lastRender = timestamp
    }

    const progress = Math.floor((timestamp - lastRender) / DELAY)
    if (progress > lastProgress) {
      lastProgress = progress
      gameLoop()
    }
    window.requestAnimationFrame(loop)
  }

  return {
    isPlaying: false,
    start() {
      if (!this.isPlaying) {
        this.isPlaying = true
        window.requestAnimationFrame(loop)
      }
    }
  }
}
