// import { useProducts } from "../Hooks/ProductsContext";
// import "./CartModal.css";

// function CartModal({ onClose }) {
//   const { products } = useProducts();
//   let orderItems = JSON.parse(localStorage.getItem("order")) || [];

//   // Asegúrate de mapear por `id` dentro del objeto almacenado
//   const orderedProducts = orderItems
//     .map((orderItem) => {
//       const product = products.find((p) => p.id === orderItem.id);
//       return product ? { ...product, uniqueId: orderItem.uniqueId } : null;
//     })
//     .filter((product) => product != null);

//   // Función para eliminar un producto basándose en uniqueId
//   const removeItem = (uniqueId) => {
//     orderItems = orderItems.filter((item) => item.uniqueId !== uniqueId);
//     localStorage.setItem("order", JSON.stringify(orderItems));

//     // falta actualizar estado aca
//   };

//   // Calcular el subtotal sumando el precio de cada producto
//   const subtotal = orderedProducts.reduce(
//     (total, product) => total + product.prize,
//     0
//   );

//   return (
//     <div className="cart-modal">
//       <button onClick={onClose}>Cerrar</button>
//       <h3 className="order-title">Tu Pedido</h3>
//       {orderedProducts.length > 0 ? (
//         <>
//           <ul className="product-list">
//             {orderedProducts.map((product) => (
//               <li className="product" key={product.uniqueId}>
//                 <div className="product-text">
//                   <h4 className="product-title">{product.title}</h4>
//                   <p className="product-description">{product.descripcion}</p>
//                   <p className="product-prize">
//                     Precio: ${product.prize.toFixed(2)}
//                   </p>
//                 </div>
//                 <div className="btn-borrar">
//                   <button
//                     onClick={() => removeItem(product.uniqueId)}
//                     className="eliminar-item"
//                   >
//                     Eliminar
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//           <div className="subtotal">
//             <h5>Subtotal: ${subtotal.toFixed(2)}</h5>
//           </div>
//           <button className="checkout-button">Proceder al Pago</button>
//         </>
//       ) : (
//         <p>Tu carrito está vacío.</p>
//       )}
//     </div>
//   );
// }

// export default CartModal;

import { useState, useEffect } from "react";
import { useProducts } from "../Hooks/ProductsContext";
import "./CartModal.css";

function CartModal({ onClose }) {
  const { products } = useProducts();
  const [orderedProducts, setOrderedProducts] = useState([]);

  // Función para actualizar los productos ordenados desde localStorage
  const updateOrderedProducts = () => {
    let orderItems = JSON.parse(localStorage.getItem("order")) || [];
    const updatedProducts = orderItems
      .map((orderItem) => {
        const product = products.find((p) => p.id === orderItem.id);
        return product ? { ...product, uniqueId: orderItem.uniqueId } : null;
      })
      .filter((product) => product != null);
    setOrderedProducts(updatedProducts);
  };

  // Actualizar el estado al montar y cuando cambien los productos
  useEffect(updateOrderedProducts, [products]);

  // Función para eliminar un producto basándose en uniqueId
  const removeItem = (uniqueId) => {
    const updatedOrderItems = orderedProducts.filter(
      (item) => item.uniqueId !== uniqueId
    );
    setOrderedProducts(updatedOrderItems); // Actualiza el estado

    // Actualiza el localStorage para reflejar la eliminación
    const newOrderItems = updatedOrderItems.map((item) => ({
      id: item.id,
      uniqueId: item.uniqueId,
    }));
    localStorage.setItem("order", JSON.stringify(newOrderItems));
  };

  // Calcular el subtotal sumando el precio de cada producto
  const subtotal = orderedProducts.reduce(
    (total, product) => total + product.prize, // Asegúrate de que 'price' es correcto
    0
  );

  return (
    <div className="cart-modal">
      <p className="exit-modal" onClick={onClose}>X</p>
      <h3 className="order-title">Tu Pedido</h3>
      {orderedProducts.length > 0 ? (
        <>
          <ul className="product-list">
            {orderedProducts.map((product) => (
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
                    onClick={() => removeItem(product.uniqueId)}
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
          <button className="checkout-button">Proceder al Pago</button>
        </>
      ) : (
        <p>Tu carrito está vacío.</p>
      )}
    </div>
  );
}

export default CartModal;
