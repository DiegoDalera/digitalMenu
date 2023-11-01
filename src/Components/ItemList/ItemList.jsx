/* eslint-disable react/prop-types */

import products from '../../Data/products.json';
import Item from '../Item/Item'
import './ItemList.css';


function ItemList({ category, onIncrementOrderCount  })  {
  const filteredProducts = category 
    ? products.filter(product => product.category === category)
    : products;

    const handleAddToOrder = (productId) => {
      // Obtener el pedido actual desde localStorage
      const currentOrder = JSON.parse(localStorage.getItem('order')) || [];
      
      // Agregar el nuevo producto al pedido
      currentOrder.push(productId);
      
      // Guardar el pedido actualizado en localStorage
      localStorage.setItem('order', JSON.stringify(currentOrder));
  
      // Incrementar el contador del carrito
      onIncrementOrderCount ();
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
