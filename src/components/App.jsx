import { Outlet } from "react-router-dom";
import Menu from "./menu/Menu";
import "./App.css"

function App() {
  return (
    <div className="app-container">
      <Menu />
      <Outlet/>
    </div>
  )
}

export default App
