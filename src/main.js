import '../styles/main.css'
import { createGameLoop } from './gameLoop'
import { clearCanvas } from './util/util'
import { Game } from './game/game'
import { controller } from './game/controls';

const canvas = document.getElementById('gameCanvas')
const game = new Game(canvas)
controller.setup()
controller.addListener(game)

const gameLoop = createGameLoop(canvas, {
  update: () => {
    game.update()
  },
  draw: () => {
    clearCanvas(canvas)
    game.draw()
  },
  end: () => game.gameOver
})
gameLoop.start()
