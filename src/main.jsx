import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './components/App.jsx'
import "./main.css"
import Pagina404 from './components/404.jsx'
import Home from './components/Home.jsx'
import Grid from './components/Grid.jsx'
import CriptoPage from './components/cripto/CriptoPage.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
      </Route>
      <Route path='/criptomonedas' element={<App />}>
        <Route index element={<Grid />} />
        <Route path=':id' element={<CriptoPage />} />
      </Route>
      <Route path='*' element={<Pagina404 />} />
    </Routes>
  </BrowserRouter>
)
