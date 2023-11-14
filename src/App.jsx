
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Menu from "./Components/Menu/Menu";
import Administracion from "./Components/Administracion/Administracion";
import AdminLogin from "./Components/Administracion/AdminLogin";

import { ProductsProvider } from "./Components/Hooks/ProductsContext";
import './App.css';
import Cocina from './Components/Cocina/Cocina';

function App() {
  return (
    <ProductsProvider>
      <Router>
        <div className="main">


          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/Cocina" element={<Cocina/>} />
            <Route path="/Administracion" element={<Administracion />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />
          </Routes>
        </div>
      </Router>
    </ProductsProvider>
  );
}

export default App;
