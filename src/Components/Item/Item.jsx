/* eslint-disable react/prop-types */
import "./Item.css";

function Item({ id, image, title, descripcion, prize, onAddToOrder  }) {
  return (
    <div className="item">
      <img src={image} alt={title} className="photo-item" />
      <div className="item-info">
        <header>
          <h3>{title}</h3>
        </header>
        <div className="item-text">
          <p>{descripcion}</p>
        </div>
        <p className="item-price">${prize.toFixed(2)}</p>
        <button onClick={() => onAddToOrder(id)}>Agregar al pedido</button>
      </div>
    </div>
  );
}

export default Item;
