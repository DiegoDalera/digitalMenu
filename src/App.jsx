/* eslint-disable no-unused-vars */
import { useState } from 'react';
import './App.css';
import TopBar from './Components/TopBar/TopBar';
import Menu from './Components/Menu/Menu';
import CartModal from './Components/CartModal/CartModal';


function App() {

const [orderCount, setOrderCount] = useState(0);
const [isModalOpen, setIsModalOpen] = useState(false);

const toggleModal = () => {
  setIsModalOpen(!isModalOpen);
};

const handleAddToOrder = () => {
  setOrderCount(prevOrderCount => prevOrderCount + 1);
};
 
return (
  <div className="main">
    <TopBar orderCount={orderCount} onCartClick={toggleModal} />
    <Menu onAddToOrder={handleAddToOrder} />
    {isModalOpen && <CartModal onClose={toggleModal} />}
  </div>
);
}

export default App;

