import './App.css'

import DevTool, { configureDevtool } from 'mobx-react-devtools'
import React, { Component } from 'react'

import MobXCanvas from './MobXCanvas'
import ReduxCanvas from './ReduxCanvas'
import ReduxCanvasV2 from './ReduxCanvasV2'
import ReduxCanvasV3 from './ReduxCanvasV3'

const availableExperiments = { MobXCanvas, ReduxCanvas, ReduxCanvasV2, ReduxCanvasV3 }

configureDevtool({ updatesEnabled: false })

class App extends Component {
  renderContent () {
    const Canvas = availableExperiments[this.props.experiment]
    if (!Canvas) {
      return <ChooseAnExperiment />
    }
    return <div>
      <div className='App-canvasContainer'>
        <div className='App-canvas'>
          <Canvas />
        </div>
      </div>
      <div className='App-canvasContainer'>
        <div className='App-canvas'>
          <Canvas />
        </div>
      </div>
      <DevTool />
    </div>
  }
  render () {
    return <div className='App'>
      <div className='App-header'>
        <h2>Pixel Paint</h2>
      </div>
      {this.renderContent()}
    </div>
  }
}

function ChooseAnExperiment () {
  return <div>
    <h1>Choose an experiment</h1>
    {Object.keys(availableExperiments).map(experimentName => {
      const href = `?experiment=${experimentName}`
      return <a style={{ display: 'block', padding: 5 }} href={href} key={experimentName}>
        {experimentName}
      </a>
    })}
  </div>
}

export default App
