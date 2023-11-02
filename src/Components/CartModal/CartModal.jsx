
import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import app from '../../Data/firebaseApp'; 
import "./CartModal.css";

function CartModal({ onClose }) {

  const [orderedProducts, setOrderedProducts] = useState([]);

  useEffect(() => {
    alert("entro")
    const fetchOrderedProducts = async () => {
      
      const db = getFirestore(app);
      const orderIds = JSON.parse(localStorage.getItem("order")) || [];
      
      
      if (orderIds.length > 0) {
        const productsCol = collection(db, 'menu');
        const queryRef = query(productsCol, where('id', 'in', orderIds));
        const querySnapshot = await getDocs(queryRef);
        // Actualizar el estado con los productos obtenidos
        const fetchedProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        alert(fetchedProducts)
        setOrderedProducts(fetchedProducts);
      }
    };

    fetchOrderedProducts();
  }, []);

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
                  <p className="product-description">{product.descripcion}</p> {/* Asegúrate de que la propiedad es 'description' y no 'descripcion' en tu base de datos */}
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
