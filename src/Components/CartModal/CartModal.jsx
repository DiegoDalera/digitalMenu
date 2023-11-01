// CartModal.jsx
import './CartModal.css'; // Asegúrate de crear los estilos correspondientes

const CartModal = ({ products, onClose }) => {
  return (
    <div className="cart-modal">
      <div className="cart-modal-content">
        <button onClick={onClose}>Cerrar</button>
        {/* Aquí iría la lógica para renderizar los productos */}
        {products.map(product => (
          <div key={product}>{product}</div> // Asumiendo que product es un ID o algo simple
        ))}
      </div>
    </div>
  );
};

export default CartModal;
