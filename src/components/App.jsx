import { Outlet } from "react-router-dom";
import Menu from "./menu/Menu";

function App() {
  return (
    <>
      <Menu />
      <Outlet/>
    </>
  )
}

export default App
