import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UltrasonicSensorDisplay from './components/Map/Ultrasonicsensor.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <UltrasonicSensorDisplay/>
  </React.StrictMode>,
)
