/* eslint-disable react/prop-types */
import "./Item.css";

function Item({ id, image, title, descripcion, prize, onAddToOrder }) {
  return (
    <div className="item">
      <img src={image} alt={title} className="item-image" />
      <h3>{title}</h3>
      <p>{descripcion}</p>
      <p className="item-price">${prize.toFixed(2)}</p>
      <button onClick={() => onAddToOrder(id)}>Agregar al pedido</button>
    </div>
  );
}







export default Item;
