import axios from "axios"
import { useEffect, useState } from "react"
import "./App.css"
import Cripto from "./components/Cripto"

function App() {

  const API_URL = import.meta.env.VITE_API_URL
  const API_KEY = import.meta.env.VITE_API_KEY

  const [criptos, setCriptos] = useState()

  useEffect(() => {
    axios.get(`${API_URL}assets`, {headers: {Authorization: `Bearer ${API_KEY}`}})
      .then((response) => {
        setCriptos(response.data.data)
      })
      .catch((error) => {
        console.error("La petición falló. Error: " + error)
      })
  }, [])

  if (!criptos) return <span>Cargando...</span>

  return (
    <div className="app-container">
      <h1>Lista de Criptomonedas</h1>

      <div className="cripto-container">
        {
          criptos.map(cripto => (
            <Cripto cripto={cripto}/>           
        ))
      }
      </div>
    </div>
  )
}

export default App
