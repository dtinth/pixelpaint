import Immutable from 'immutable'
import React from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './createStore'
import Pixel from './Pixel'

// Reducer
const store = createStore((state = Immutable.Map(), action) => {
  if (action.type === 'TOGGLE') {
    const key = action.i + ',' + action.j
    return state.set(key, !state.get(key))
  }
  return state
})

const ACTIVE_PROPS = { active: true }
const INACTIVE_PROPS = { active: false }

// Connected pixel
const ConnectedPixel = connect(
  (initialState, initialProps) => {
    const { i, j } = initialProps
    return state => {
      const active = state.get(i + ',' + j) || false
      return active ? ACTIVE_PROPS : INACTIVE_PROPS
    }
  },
  (initialState, initialProps) => (dispatch) => {
    const { i, j } = initialProps
    return {
      onToggle() {
        dispatch({ type: 'TOGGLE', i, j })
      }
    };
  },
  (stateProps, dispatchProps, ownProps) => ({
    i: ownProps.i,
    j: ownProps.j,
    active: stateProps.active,
    onToggle: dispatchProps.onToggle
  })
)(Pixel);

// Root component
function ReduxCanvas () {
  const items = [ ]
  for (let i = 0; i < 127; i++) {
    for (let j = 0; j < 127; j++) {
      items.push(<ConnectedPixel i={i} j={j} key={i + ',' + j} />)
    }
  }
  return (
    <Provider store={store}>
      <div>
        {items}
      </div>
    </Provider>
  )
}

export default ReduxCanvas
