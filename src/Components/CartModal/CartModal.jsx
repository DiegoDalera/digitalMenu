/* eslint-disable react/prop-types */

import { useProducts } from "../Hooks/ProductsContext";
import "./CartModal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// import { Trash } from "react-bootstrap-icons";

function CartModal() {
  const {
    isCartModalVisible,
    hideCartModal,
    cartProducts,
    removeFromCart,
    sendOrder,
  } = useProducts();

  const totalPrice = cartProducts.reduce((total, product) => {
    return total + product.prize;
  }, 0);

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={isCartModalVisible}
      onHide={hideCartModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Tu pedido</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartProducts.map((product) => (
          <li className="product" key={product.uniqueId}>
            <div className="product-text">
              <h4 className="product-title">{product.title}</h4>
              <p className="product-description">{product.descripcion}</p>
              <p className="product-prize">
                Precio: ${product.prize.toFixed(2)}
              </p>
            </div>
            <div className="btn-borrar">
              <button
                className="btn-erase"
                onClick={() => removeFromCart(product.uniqueId)}
              >
                borrar
              </button>
            </div>
          </li>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <p>Total a pagar: ${totalPrice.toFixed(2)}</p>
        <Button onClick={hideCartModal}>Cerrar</Button>
        <Button onClick={sendOrder}>Enviar Orden</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;

/* <div className="cart-modal">
      <p className="exit-modal" onClick={hideCartModal}>
        X
      </p>
      <h3 className="order-title">Tu Pedido</h3>
      {console.log("cart products ", cartProducts)}
      {cartProducts.length > 0 ? (
        <>
          <ul className="product-list">
            {cartProducts.map((product) => (
              <li className="product" key={product.uniqueId}>
                <div className="product-text">
                  <h4 className="product-title">{product.title}</h4>
                  <p className="product-description">{product.descripcion}</p>
                  <p className="product-prize">
                    Precio: ${product.prize.toFixed(2)}
                  </p>
                </div>
                <div className="btn-borrar">
                  <button
                    onClick={() => removeFromCart(product.uniqueId)}
                    className="eliminar-item"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="subtotal">
            <h5>Subtotal: ${subtotal.toFixed(2)}</h5>
          </div>
          <div className="comentarios">
            <textarea name="textarea" className="comentarios-text" rows="5">
              Por Indicanos ....
            </textarea>
          </div>

          <div className="table-content">
            <label htmlFor="num-table">N de Mesa:</label>
            <input
              className="num-table"
              type="number"
              id="num-table"
              name="num-table"
            />
            <button className="btn-pago">Finalizar Pedido</button>
          </div>
        </>
      ) : (
        <p>Tu carrito está vacío.</p>
      )}
    </div> */
