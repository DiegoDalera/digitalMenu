
import { useProducts } from '../Hooks/ProductsContext';
import "./CartModal.css";

function CartModal({ onClose }) {
  const { products } = useProducts(); // Usamos el hook para acceder a los productos del contexto
  const orderIds = JSON.parse(localStorage.getItem("order")) || [];

  // Filtramos los productos basándonos en los IDs guardados en localStorage
  const orderedProducts = orderIds.map(id => products.find(product => product.id === id)).filter(product => product != null);

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
                  <img src={product.image} alt={product.title} className="product-img" />
                </div>
                <div className="product-text">
                  <h4 className="product-title">{product.title}</h4>
                  <p className="product-description">{product.description}</p>
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
