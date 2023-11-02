/* eslint-disable no-unused-vars */
import './App.css';
import TopBar from './Components/TopBar/TopBar';
import Menu from './Components/Menu/Menu';
import CartModal from './Components/CartModal/CartModal';
import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseApp from './Data/firebaseApp';

import { ProductsProvider } from './Components/Hooks/ProductsContext';

function App() {
  const [orderCount, setOrderCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);

  // Carga productos desde Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const db = getFirestore(firebaseApp);
        const productsCol = collection(db, 'menu');
        const querySnapshot = await getDocs(productsCol);
        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(fetchedProducts);
        console.log('Products:', fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Reiniciar el contador del carrito
    setOrderCount(0); // Asegúrate de que tienes una función `setOrderCount`

    // Vaciar localStorage
    localStorage.removeItem('order');
  }, []); 

  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddToOrder = () => {
    setOrderCount(prevOrderCount => prevOrderCount + 1);
  };

  // Proporcionar 'products' y 'setProducts' al contexto
  return (
    <ProductsProvider value={{ products, setProducts }}>
      <div className="main">
        <TopBar orderCount={orderCount} onCartClick={toggleModal} />
        <Menu onAddToOrder={handleAddToOrder} />
        {isModalOpen && <CartModal onClose={toggleModal} />}
      </div>
    </ProductsProvider>
  );
}

export default App;


