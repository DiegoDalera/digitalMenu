/* eslint-disable react/prop-types */
import "./CartModal.css";
import products from "../../Data/products.json";

function CartModal({ onClose }) {
  // Obtener la lista de IDs del pedido del localStorage
  const orderIds = JSON.parse(localStorage.getItem("order")) || [];

  // Encontrar los productos solicitados por ID
  const orderedProducts = products.filter((product) =>
    orderIds.includes(product.id)
  );

  return (
    <div className="cart-modal">
      <button onClick={onClose}>Cerrar</button>
      <h3 className="order-title">Tu Pedido</h3>
      {orderedProducts.length > 0 ? (
        <>
          <ul className="product-list">
            {orderedProducts.map((product) => (
              <li className="product" key={product.id}>
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-img"
                  />
                </div>
                <div className="product-text">
                  <h4 className="product-title">{product.title}</h4>
                  <p className="product-description">{product.descripcion}</p>
                  <p className="product-prize">
                    Precio: ${product.prize.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <button className="checkout-button">Proceder al Pago</button>
        </>
      ) : (
        <p>Tu carrito está vacío.</p>
      )}
    </div>
  );
} 

export default CartModal;

