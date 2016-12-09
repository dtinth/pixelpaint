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

// Selector
const selectActive = (state, i, j) => state.get(i + ',' + j)

// Action creator
const toggle = (i, j) => ({ type: 'TOGGLE', i, j })

// Root component
function ReduxCanvas () {
  const items = [ ]
  for (let i = 0; i < 128; i++) {
    for (let j = 0; j < 128; j++) {
      items.push(<PixelContainer i={i} j={j} key={i + ',' + j} />)
    }
  }
  return <Provider store={store}>
    <div>
      {items}
    </div>
  </Provider>
}

const PixelContainer = connect(
  (state, ownProps) => ({ active: selectActive(state, ownProps.i, ownProps.j) }),
  (dispatch, ownProps) => ({ onToggle: () => dispatch(toggle(ownProps.i, ownProps.j)) })
)(Pixel)

export default ReduxCanvas
