/* eslint-disable react/prop-types */
import { useProducts } from "../Hooks/ProductsContext"; // Asegúrate de que la ruta sea correcta
import './Item.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Item({ id, image, title, descripcion, prize }) {
  const notify = () => toast.success("Agregado al pedido!");

  const { addToCart } = useProducts(); // Utiliza la función addToCart del contexto

  // Manejador  el evento clic del botón Agregar al pedido
  const handleAddToCart = () => {
    // Creo el objeto producto que quieres agregar
    const productToAdd = {
      id,
      image,
      title,
      descripcion,
      prize,
    };

    // LLamo a la función addToCart del contexto
    addToCart(productToAdd);
    notify();
  };

  return (
    <div className="item">
      <img src={image} alt={title} className="item-image" />
      <h3 className="item-title">{title}</h3>
      <p className="item-desctipcion">{descripcion}</p>
      <p className="item-price">${prize.toFixed(2)}</p>
      <button onClick={handleAddToCart} className="btn-button">
        Agregar al pedido
      </button>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Item;
