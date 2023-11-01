/* eslint-disable no-unused-vars */
import { useState } from 'react';
import './App.css';
import TopBar from './Components/TopBar/TopBar';
import Menu from './Components/Menu/Menu';


function App() {

const [orderCount, setOrderCount] = useState(0);

const handleAddToOrder = () => {
  setOrderCount(prevOrderCount => prevOrderCount + 1);
};
 
  return (
    <div className="main">
      <TopBar orderCount={orderCount} />
      <Menu onAddToOrder={handleAddToOrder} />
    </div>
  );
}

export default App;

