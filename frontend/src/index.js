import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRouter from './router.js'
import { ContextProvider } from './ContextProvider.js'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ContextProvider>
      <AppRouter />
    </ContextProvider>
  </React.StrictMode>,
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals()
