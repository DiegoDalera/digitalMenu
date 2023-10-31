
import products from '../../Data/products.json';
import Item from '../Item/Item'
import './ItemList.css';

function ItemList({ category }) {
  const filteredProducts = category 
    ? products.filter(product => product.category === category)
    : products;

  return (
    <div className="item-list">
      {filteredProducts.map(product => (
        <Item key={product.id} 
              image={product.image} 
              title={product.title} 
              descripcion={product.descripcion} 
              prize={product.prize} />
      ))}
    </div>
  );
}

export default ItemList;
