import { Link } from "react-router-dom"
import "./Home.css"

function Home() {
  return (
    <div className="home-container">
      <h1 className="title">¡Bienvenidos a CriptoMarket</h1>
      <p className="subtitle">Conoce las 100 criptos más usadas</p>
      <Link to="/criptomonedas" className="link">Ver criptomonedas</Link>
    </div>
  )
}

export default Home