/* eslint-disable react/prop-types */

import products from '../../Data/products.json';
import Item from '../Item/Item'
import './ItemList.css';


function ItemList({ category,onAddToOrder   })  {

  const filteredProducts = category 
    ? products.filter(product => product.category === category)
    : products;

    const handleAddToOrder = (productId) => {
      
      const currentOrder = JSON.parse(localStorage.getItem('order')) || [];
      currentOrder.push(productId);
      localStorage.setItem('order', JSON.stringify(currentOrder));

      onAddToOrder();
  }
  

  return (
    <div className="item-list">
      {filteredProducts.map(product => (
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
