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
  return <Provider store={store}><Canvas /></Provider>
}

const Canvas = connect(
  (state) => ({ state }),
  (dispatch) => ({ onToggle: (i, j) => dispatch(toggle(i, j)) })
)(function Canvas ({ state, onToggle }) {
  const items = [ ]
  for (let i = 0; i < 128; i++) {
    for (let j = 0; j < 128; j++) {
      items.push(<PixelContainer
        i={i}
        j={j}
        active={selectActive(state, i, j)}
        onToggle={onToggle}
        key={i + ',' + j}
      />)
    }
  }
  return <div>{items}</div>
})

class PixelContainer extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
  }
  handleToggle () {
    this.props.onToggle(this.props.i, this.props.j)
  }
  render () {
    return <Pixel
      i={this.props.i}
      j={this.props.j}
      active={this.props.active}
      onToggle={this.handleToggle}
    />
  }
}

export default ReduxCanvas
