
import './Item.css';

function Item({image,title,descripcion,prize }) {
  return (
    <div className="item">
      <img src={image} alt={title} className="item-image" />
      <h3>{title}</h3>
      <p>{descripcion}</p>
      <p className="item-price">${prize.toFixed(2)}</p>
    </div>
  );
}

export default Item;
