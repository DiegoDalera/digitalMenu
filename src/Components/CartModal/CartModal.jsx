/* eslint-disable react/prop-types */
import './CartModal.css'

function CartModal({ onClose }) {
  return (
    <div className="modal-content">
       <h2>Realiza tu pedido</h2>
       
      <button onClick={onClose}>Cerrar</button>
     
    </div>
  );
}

export default CartModal;
