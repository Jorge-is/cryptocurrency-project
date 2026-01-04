import "./Cripto.css"

function Cripto({cripto}) {
  return (
    <div className="cripto">
      <h3>{cripto.name}</h3>
      <div className="info">
        <p><span className="label">Precio: </span>{parseFloat(cripto.priceUsd).toFixed(4)}</p>
        <p><span className="label">Código: </span>{cripto.symbol}</p>
        <p>
          <span className="label">Variación 24hrs: </span>
          <span className={cripto.changePercent24Hr > 0 ? "positivo" : "negativo"}>
            {parseFloat(cripto.changePercent24Hr).toFixed(4)}%
          </span>
        </p>
      </div>
    </div>
  )
}

export default Cripto