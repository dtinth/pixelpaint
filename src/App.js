import './App.css'

import React, { Component } from 'react'

/* eslint import/no-webpack-loader-syntax: off */
const MobXCanvas = require('bundle?lazy&name=MobXCanvas!./MobXCanvas')
const ReduxCanvas = require('bundle?lazy&name=ReduxCanvas!./ReduxCanvas')
const ReduxCanvasV2 = require('bundle?lazy&name=ReduxCanvasV2!./ReduxCanvasV2')
const ReduxCanvasV3 = require('bundle?lazy&name=ReduxCanvasV3!./ReduxCanvasV3')
const ReduxCanvasV4 = require('bundle?lazy&name=ReduxCanvasV4!./ReduxCanvasV4')

const availableExperiments = {
  MobXCanvas,
  ReduxCanvas,
  ReduxCanvasV2,
  ReduxCanvasV3,
  ReduxCanvasV4
}

class App extends Component {
  renderContent () {
    const experiment = availableExperiments[this.props.experiment]
    if (!experiment) {
      return <ChooseAnExperiment />
    }
    return <ExperimentContainer experiment={experiment} />
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

class ExperimentContainer extends Component {
  constructor (props) {
    super(props)
    this.state = { Canvas: null, devTool: null }
  }
  componentDidMount () {
    this.props.experiment((experimentModule) => {
      this.setState({
        Canvas: experimentModule.default,
        devTool: experimentModule.renderDevTool &&
          experimentModule.renderDevTool() ||
          null
      })
    })
  }
  render () {
    if (!this.state.Canvas) {
      return <div style={{ marginTop: 48, fontSize: 32 }}>
        (loading experiment)
      </div>
    }
    const { Canvas } = this.state
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
      {this.state.devTool}
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
