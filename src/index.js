import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

const experiment = (/experiment=(\w+)/.exec(window.location.search) || [ ])[1]

ReactDOM.render(
  <App experiment={experiment} />,
  document.getElementById('root')
)
