import { Link } from "react-router-dom"

function Home() {
  return (
    <>
      <h1>¡Bienvenidos a CriptoMarket</h1>
      <p>Conoce las 100 criptos más usadas</p>
      <Link to="/criptomonedas">Ver criptomonedas</Link>
    </>
  )
}

export default Home