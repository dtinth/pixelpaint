import './Pixel.css'

import React from 'react'

export default class Pixel extends React.PureComponent {
  render () {
    const { i, j, active, onToggle } = this.props
    return <div
      className='Pixel'
      style={{ top: i * 3, left: j * 3 }}
      onMouseOver={onToggle}
      data-active={active ? '1' : '0'}
    />
  }
}
