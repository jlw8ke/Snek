import config from '../config.json'

export const getDirection = event => {
  switch (event.keyCode) {
    case config.controls.LEFT:
      return 'LEFT'
    case config.controls.UP:
      return 'UP'
    case config.controls.RIGHT:
      return 'RIGHT'
    case config.controls.DOWN:
      return 'DOWN'
    default:
      return undefined
  }
}

const listeners = []

export const controller = {
  setup: () => {
    document.addEventListener('keydown', event => {
      listeners.forEach(listener => {
        if (listener.onHandleControlEvent) {
          listener.onHandleControlEvent(event)
        }
      })
    })
  },
  addListener: listener => {
    listeners.push(listener)
  }
}
