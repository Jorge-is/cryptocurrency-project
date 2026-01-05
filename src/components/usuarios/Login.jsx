import axios from "axios"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import "./Login.css"

function Login() {

  const API_USERS_URL = import.meta.env.VITE_API_USERS_URL;

  const navigation = useNavigate()

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState()

  function submit(e) {
    e.preventDefault()
    setCargando(true)
    setError(null)
    axios.post(`${API_USERS_URL}`, user)
      .then(response => {
        setCargando(false)
        localStorage.setItem("tokenCriptoMarket", response.data.data)
        navigation("/")
      })
      .catch(error => {
        setCargando(false)
        console.table(error)
        setError(error.response.data.error)
      })
  }

  if (localStorage.getItem("tokenCriptoMarket")) return <Navigate to="/" />

  return (
    <div className="login-container">
      <h1>Iniciar sesión</h1>
      <form onSubmit={submit}>
        <div className="field">
          <label htmlFor="email">Correo Electrónico</label>
          <input required onChange={(e) => {
            setUser({
              ...user,
              email: e.target.value
            })
          }} type="email" name="email" />
        </div>
        <div className="field">
          <label htmlFor="password">Contraseña</label>
          <input required onChange={(e) => {
            setUser({
              ...user,
              password: e.target.value
            })
          }} type="password" name="password"/>
        </div>
        <div className="submit">
          <input
          type="submit"
          value={cargando ? "cargando..." : "Ingresar"}
          className="link"
        />
        </div>
      </form>
      {
        error && <span className="error">Error: {error}</span>
      }
    </div>
  )
}

export default Login
