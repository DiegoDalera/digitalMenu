import  { useState } from 'react';
import './App.css'
import TopBar from './Components/TopBar/TopBar';
import Menu from './Components/Menu/Menu';
import Footer from './Components/Footer/Footer';

function App() {
  
  const [orderCount, setOrderCount] = useState(0);

  const handleAddToOrder = () => {
    setOrderCount(prevCount => prevCount + 1);
  };

  return (
    <div className="main">
      <TopBar orderCount={orderCount} />
      <Menu onIncrementOrderCount={handleAddToOrder} />
      <Footer />
    </div>
  );
}

export default App;
