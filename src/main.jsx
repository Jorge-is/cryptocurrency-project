import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './components/App.jsx'
import "./main.css"
import Pagina404 from './components/404.jsx'
import Home from './Home.jsx'
import Grid from './components/Grid.jsx'
import CriptoPage from './components/cripto/CriptoPage.jsx'
import Perfil from './components/usuarios/Perfil'
import { UserContextProvider } from './context/UserContext.jsx'
import Login from './components/usuarios/Login'

createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='perfil' element={<Perfil />} />
        </Route>
        <Route path='/criptomonedas' element={<App />}>
          <Route index element={<Grid />} />
          <Route path=':id' element={<CriptoPage />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Pagina404 />} />
      </Routes>
    </BrowserRouter>
  </UserContextProvider>
)
