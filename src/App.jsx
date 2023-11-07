
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopBar from "./Components/TopBar/TopBar";
import Menu from "./Components/Menu/Menu";
import Cocina from "./Components/Cocina/Cocina";
import Administracion from "./Components/Administracion/Administracion";
import CartModalWrapper from './Components/CartModal/CartModalWrapper';
import { ProductsProvider } from "./Components/Hooks/ProductsContext";
import './App.css';

function App() {
  return (
    <ProductsProvider>
      <Router>
        <div className="main">
          <TopBar />
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/Cocina" element={<Cocina />} />
            <Route path="/Administracion" element={<Administracion />} />
          </Routes>
          <CartModalWrapper />
        </div>
      </Router>
    </ProductsProvider>
  );
}

export default App;
