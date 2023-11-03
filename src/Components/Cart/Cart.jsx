/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BsFillCartFill } from "react-icons/bs";
import { useProducts } from "../Hooks/ProductsContext";
import './Cart.css'

function Cart() {

  const { showCartModal, orderCount } = useProducts();

  return (
    <div className="cart" >
      <h4>{orderCount}</h4>
      <BsFillCartFill className="cart-icon" onClick={showCartModal}/>
    </div>
  );
}


export default Cart;
