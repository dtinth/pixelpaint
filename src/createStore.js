import { createStore as originalCreateStore } from 'redux'

export function createStore (reducer) {
  const extension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  return originalCreateStore(reducer, extension)
}

export default createStore
