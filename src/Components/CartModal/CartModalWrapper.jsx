
// En CartModalWrapper.js
import { useProducts } from "../Hooks/ProductsContext"
import CartModal from './CartModal'

const CartModalWrapper = () => {
  const { isCartModalVisible } = useProducts(); // Esto ahora funcionará porque CartModalWrapper está dentro del ProductsProvider

  return isCartModalVisible ? <CartModal /> : null;
};

export default CartModalWrapper;
