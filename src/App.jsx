import { useEffect, useState } from "react"

function App() {

  const API_URL = import.meta.env.VITE_API_URL
  const API_KEY = import.meta.env.VITE_API_KEY

  const [criptos, setCriptos] = useState()

  useEffect(() => {
    fetch(`${API_URL}assets`, {method: "GET", headers: {"Authorization": `Bearer ${API_KEY}`}})
      .then((response) => response.json())
      .then((data) => {
        setCriptos(data.data)
      })
      .catch((error) => {
        console.error("La petición falló. Error: " + error)
      })
  }, [])

  if (!criptos) return <span>Cargando...</span>

  return (
    <>
      <h1>Lista de Criptomonedas</h1>

      <ol>
        {
          criptos.map(cripto => (
            <li key={cripto.id}>Nombre: {cripto.name} ({cripto.symbol}) - Precio: {cripto.priceUsd}</li>
        ))
        }
      </ol>
    </>
  )
}

export default App
