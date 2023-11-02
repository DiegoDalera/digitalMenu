/* eslint-disable react/prop-types */

// import products from '../../Data/products.json';
// import Item from '../Item/Item'
// import './ItemList.css';


// function ItemList({ category,onAddToOrder })  {

//   const filteredProducts = category 
//     ? products.filter(product => product.category === category)
//     : products;

//     const handleAddToOrder = (productId) => {
      
//       const currentOrder = JSON.parse(localStorage.getItem('order')) || [];
//       currentOrder.push(productId);
//       localStorage.setItem('order', JSON.stringify(currentOrder));

//       onAddToOrder();
//   }
  

//   return (
//     <div className="item-list">
//       {filteredProducts.map(product => (
//         <Item key={product.id}
//               id={product.id} 
//               image={product.image} 
//               title={product.title} 
//               descripcion={product.descripcion} 
//               prize={product.prize}
//               onAddToOrder={handleAddToOrder} />
//       ))}
//     </div>
//   );
// }

// export default ItemList;

import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import app from '../../Data/firebaseApp'
import Item from '../Item/Item'
import './ItemList.css';

function ItemList({ category, onAddToOrder }) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    const db = getFirestore(app);
    const productsCol = collection(db, 'menu');
    const queryRef = category ? query(productsCol, where('category', '==', category)) : productsCol;

    
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(queryRef);
      const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    };

    fetchProducts();
  }, [category]); // Este efecto se ejecutará de nuevo cuando la categoría cambie

  const handleAddToOrder = (productId) => {
    const currentOrder = JSON.parse(localStorage.getItem('order')) || [];
    currentOrder.push(productId);
    localStorage.setItem('order', JSON.stringify(currentOrder));
    onAddToOrder();
  }

  return (
    <div className="item-list">
      {products.map(product => (
        <Item key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              descripcion={product.descripcion}
              prize={product.prize}
              onAddToOrder={handleAddToOrder} />
      ))}
    </div>
  );
}

export default ItemList;
