import Immutable from 'immutable'
import React from 'react'
import { Provider, connect } from 'react-redux'

import createStore from './createStore'
import Pixel from './Pixel'

// Initial state
const generateInitialState = (size) => (size === 1
  ? false
  : Immutable.List([
    generateInitialState(size / 2),
    generateInitialState(size / 2),
    generateInitialState(size / 2),
    generateInitialState(size / 2)
  ])
)

function keyPathToCoordinate (keyPath) {
  let i = 0
  let j = 0
  for (const quadrant of keyPath) {
    i <<= 1
    j <<= 1
    switch (quadrant) {
      case 0: j |= 1; break
      case 1: break
      case 2: i |= 1; break
      case 3: i |= 1; j |= 1; break
    }
  }
  return [ i, j ]
}

function coordinateToKeyPath (i, j) {
  const keyPath = [ ]
  for (let threshold = 64; threshold > 0; threshold >>= 1) {
    keyPath.push(i < threshold
      ? j < threshold ? 1 : 0
      : j < threshold ? 2 : 3
    )
    i %= threshold
    j %= threshold
  }
  return keyPath
}

// Reducer
const store = createStore(
  function reducer (state = generateInitialState(128), action) {
    if (action.type === 'TOGGLE') {
      const keyPath = coordinateToKeyPath(action.i, action.j)
      return state.updateIn(keyPath, (active) => !active)
    }
    return state
  }
)

// Action creator
const toggle = (i, j) => ({ type: 'TOGGLE', i, j })

// Root component
function ReduxCanvas () {
  return <Provider store={store}><GridContainer /></Provider>
}

const GridContainer = connect(
  (state, ownProps) => ({ state }),
  (dispatch) => ({ onToggle: (i, j) => dispatch(toggle(i, j)) })
)(function GridContainer ({ state, onToggle }) {
  return <Grid keyPath={[ ]} state={state} onToggle={onToggle} />
})

class Grid extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
  }
  shouldComponentUpdate (nextProps) {
    // Required since we construct a new `keyPath` every render
    // but we know that each grid instance will be rendered with
    // a constant `keyPath`. Otherwise we need to memoize the
    // `keyPath` for each children we render to remove this
    // "escape hatch."
    return this.props.state !== nextProps.state
  }
  handleToggle () {
    const [ i, j ] = keyPathToCoordinate(this.props.keyPath)
    this.props.onToggle(i, j)
  }
  render () {
    const { keyPath, state } = this.props
    if (typeof state === 'boolean') {
      const [ i, j ] = keyPathToCoordinate(keyPath)
      return <Pixel
        i={i}
        j={j}
        active={state}
        onToggle={this.handleToggle}
      />
    } else {
      return <div>
        <Grid onToggle={this.props.onToggle} keyPath={[ ...keyPath, 0 ]} state={state.get(0)} />
        <Grid onToggle={this.props.onToggle} keyPath={[ ...keyPath, 1 ]} state={state.get(1)} />
        <Grid onToggle={this.props.onToggle} keyPath={[ ...keyPath, 2 ]} state={state.get(2)} />
        <Grid onToggle={this.props.onToggle} keyPath={[ ...keyPath, 3 ]} state={state.get(3)} />
      </div>
    }
  }
}

export default ReduxCanvas
