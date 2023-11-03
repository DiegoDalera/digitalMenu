/* eslint-disable react/prop-types */
import { useProducts } from "../Hooks/ProductsContext"; // Asegúrate de que la ruta sea correcta

function Item({ id, image, title, descripcion, prize }) {
  const { addToCart } = useProducts(); // Utiliza la función addToCart del contexto

  // Manejador  el evento clic del botón Agregar al pedido
  const handleAddToCart = () => {
    // Creo el objeto producto que quieres agregar
    const productToAdd = {
      id,
      image,
      title,
      descripcion,
      prize
    };

    // LLamo a la función addToCart del contexto
    addToCart(productToAdd);
  };

  return (
    <div className="item">
      <img src={image} alt={title} className="item-image" />
      <h3>{title}</h3>
      <p>{descripcion}</p>
      <p className="item-price">${prize.toFixed(2)}</p>
      <button onClick={handleAddToCart} className="btn-button">Agregar al pedido</button>
    </div>
  );
}

export default Item;
