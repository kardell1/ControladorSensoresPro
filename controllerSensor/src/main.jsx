import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { Rutas } from './pages/Route'
import "./assets/styles/index.css"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <Rutas/>
    </BrowserRouter> 
  </React.StrictMode>
)
