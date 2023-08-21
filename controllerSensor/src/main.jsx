import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { Rutas } from './pages/Route'
//la importacion de los estilos se hace en la archivo de mas alto nivel , es decir el archivo que cargara dentro todos los componentes, en este caso el main.jsx
import "./assets/styles/index.css"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <Rutas/>
    </BrowserRouter> 
  </React.StrictMode>
)
//para usar el react-router-dom es necesario envolver el componente de rutas dentro del browserRouter