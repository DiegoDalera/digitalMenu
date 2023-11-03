/* eslint-disable react/prop-types */

import { createContext, useContext, useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseApp from "../../Data/firebaseApp";

export const ProductsContext = createContext(null);

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
  
  const [products, setProducts] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [isCartModalVisible, setIsCartModalVisible] = useState(false);


  
  //carga los productes de storage
  useEffect(() => {
    const savedCartProducts =
      JSON.parse(localStorage.getItem("cartProducts")) || [];
    setCartProducts(savedCartProducts);
  }, []);

  //Carga los productos desde Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const db = getFirestore(firebaseApp);
        const productsCol = collection(db, "menu");
        const querySnapshot = await getDocs(productsCol);
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Restablecer el contador y el carrito cuando se monta el componente por primer ves
  useEffect(() => {
    setOrderCount(0);
    setCartProducts([]);
    localStorage.removeItem("order");
  }, []);


//agrega productos a Cart
const generateUniqueId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

const addToCart = (product) => {
  const newCartProduct = {
    ...product,
    uniqueId: generateUniqueId() // Asegura de que cada producto tenga un identificador único al ser añadido
  };
  
  const newCartProducts = [...cartProducts, newCartProduct];
  setCartProducts(newCartProducts);
  setOrderCount(newCartProducts.length);
  localStorage.setItem("cartProducts", JSON.stringify(newCartProducts));
};


  //elimina productos a Cart
  const removeFromCart = (productId) => {
    const newCartProducts = cartProducts.filter((p) => p.uniqueId !== productId);
    setCartProducts(newCartProducts);
    setOrderCount(newCartProducts.length);
    localStorage.setItem("cartProducts", JSON.stringify(newCartProducts));
  };

  //Muestra el Modal
  const showCartModal = () => {
    setIsCartModalVisible(true);
  };

  //Oculta el Modal
  const hideCartModal = () => {
    setIsCartModalVisible(false);
  };
  
  const value = {
    products,
    setProducts,
    orderCount,
    setOrderCount,
    cartProducts,
    setCartProducts,
    addToCart,
    removeFromCart,
    isCartModalVisible,
    showCartModal,
    hideCartModal
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
