import { createStore as originalCreateStore } from 'redux'

export function createStore (reducer) {
  let enhancer
  if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancer = window.__REDUX_DEVTOOLS_EXTENSION__()
  }
  return originalCreateStore(reducer, enhancer)
}

export default createStore
