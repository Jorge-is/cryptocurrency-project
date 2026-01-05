import axios from "axios"
import { useEffect, useState } from "react"

function usePetition(endpoint) {

  const API_URL = import.meta.env.VITE_API_URL
  const API_KEY = import.meta.env.VITE_API_KEY

  const [data, setData] = useState()
  const [cargando, setCargando] = useState(false)
  
  useEffect(() => {
    setCargando(true)

    axios.get(`${API_URL}${endpoint}`, {headers: {Authorization: `Bearer ${API_KEY}`}})
      .then(response => {
        setData(response.data.data)
        setCargando(false)
      })
      .catch(e => {
        setCargando(false)
        console.error("La petición falló. Error: " + e)
      })
  }, [])

  return [data, cargando]
}

export default usePetition