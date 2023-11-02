import { useProducts } from "../Hooks/ProductsContext";
import Item from "../Item/Item";
import "./ItemList.css";

function ItemList({ category, onAddToOrder }) {
  const { products } = useProducts(); // Usamos el hook para acceder a los productos del contexto
  console.log("products itemlist ", products);
  
  // Filtramos los productos directamente desde el contexto basándonos en la categoría
  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

    const handleAddToOrder = (productId) => {
      const currentOrder = JSON.parse(localStorage.getItem('order')) || [];
      const newItem = {
        id: productId,
        uniqueId: Date.now() // ID unico 
      };
      currentOrder.push(newItem);
      localStorage.setItem('order', JSON.stringify(currentOrder));
      onAddToOrder();
    };
    
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
          onAddToOrder={handleAddToOrder}
        />
      ))}
    </div>
  );
}

export default ItemList;
