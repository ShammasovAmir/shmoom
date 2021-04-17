import React from 'react'
import ReactDOM from 'react-dom'
import { ContextProvider } from './SocketContext'
import App from './App'
import 'fontsource-roboto'
import './styles.css'

ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById('root')
)
