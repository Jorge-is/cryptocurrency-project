import { Link } from "react-router-dom"
import "./Cripto.css"

function Cripto({cripto}) {
  return (
    <div className="cripto">
      <Link to={`/criptomonedas/${cripto.id}`}><h2>{cripto.name}</h2></Link>
      <div className="info">
        <p><span className="label">Precio: </span>{parseFloat(cripto.priceUsd).toFixed(4)}</p>
        <p><span className="label">Código: </span>{cripto.symbol}</p>
        <p>
          <span className="label">Variación 24hrs: </span>
          <span className={cripto.changePercent24Hr > 0 ? "positivo" : "negativo"}>
            {parseFloat(cripto.changePercent24Hr).toFixed(3)}%
          </span>
        </p>
      </div>
    </div>
  )
}

export default Cripto