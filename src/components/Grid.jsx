import Cripto from "./cripto/Cripto"
import usePetition from "../hooks/usePetition"
import "./Grid.css"

function Grid() {

  const [criptos] = usePetition("assets")

  if (!criptos) return <span>Cargando...</span>

  return (
    <div className="grid-container">
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

export default Grid
