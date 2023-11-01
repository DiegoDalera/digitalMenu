/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BsFillCartFill } from "react-icons/bs";
import './Cart.css'

function Cart({ orderCount, onCartClick }) {
  return (
    <div className="cart" onClick={onCartClick}>
      <h4>{orderCount}</h4>
      <BsFillCartFill className="cart-icon" />
    </div>
  );
}


export default Cart;
