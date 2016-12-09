import React from 'react'
import { observable, asMap, action } from 'mobx'
import { observer } from 'mobx-react'

import Pixel from './Pixel'

const store = observable({
  pixels: asMap({ }),
  isActive (i, j) {
    return !!store.pixels.get(i + ',' + j)
  },
  toggle: action(function toggle (i, j) {
    store.pixels.set(i + ',' + j, !store.isActive(i, j))
  })
})

function MobXCanvas () {
  const items = [ ]
  for (let i = 0; i < 128; i++) {
    for (let j = 0; j < 128; j++) {
      items.push(<PixelContainer i={i} j={j} key={i + ',' + j} />)
    }
  }
  return <div>{items}</div>
}

const PixelContainer = observer(function PixelContainer ({ i, j }) {
  return <Pixel
    i={i}
    j={j}
    active={store.isActive(i, j)}
    onToggle={() => store.toggle(i, j)}
  />
})

export default MobXCanvas
