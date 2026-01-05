import { NavLink, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import "./Menu.css"

function Menu() {

  const navigation = useNavigate()

  const usuario = useContext(UserContext)

  return (
    <nav className="main-menu">
      <ul>
        <li><NavLink to="/">Inicio</NavLink></li>
        <li><NavLink to="/criptomonedas">Criptomonedas</NavLink></li>
        <li><NavLink to="/perfil">Perfil de {usuario.name}</NavLink></li>
        <li><a onClick={() => {
          localStorage.removeItem("tokenCriptoMarket")
          navigation("/login")
        }}>Cerrar sesión</a></li>
      </ul>
    </nav>
  )
}

export default Menu