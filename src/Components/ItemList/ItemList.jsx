/* eslint-disable react/prop-types */
import { useProducts } from "../Hooks/ProductsContext";
import Item from "../Item/Item";
import "./ItemList.css";

function ItemList({ category }) {

  const { products } = useProducts(); 
   
  // Filtramos los productos directamente desde el contexto basándonos en la categoría
  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;


    
  return (
    <div className="item-list">
      {filteredProducts.map((product) => (
        <Item
          key={product.id}
          id={product.id}
          image={product.image}
          title={product.title}
          descripcion={product.descripcion}
          prize={product.prize}
        />
      ))}
    </div>
  );
}

export default ItemList;
