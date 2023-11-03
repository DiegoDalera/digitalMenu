// En App.js
import "./App.css";
import { useEffect } from "react";
import TopBar from "./Components/TopBar/TopBar";
import Menu from "./Components/Menu/Menu";
import { ProductsProvider } from "./Components/Hooks/ProductsContext";
import CartModalWrapper from './Components/CartModal/CartModalWrapper'

function App() {

  useEffect(() => {
    localStorage.clear(); 
  }, []); 

  return (
    <ProductsProvider>
      <div className="main">
        <TopBar />
        <Menu />
        <CartModalWrapper />
      </div>
    </ProductsProvider>
  );
}

export default App;

