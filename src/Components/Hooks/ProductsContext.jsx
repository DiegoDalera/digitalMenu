/* eslint-disable react/prop-types */

import { createContext, useContext, useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import firebaseApp from "../../Data/firebaseApp";

export const ProductsContext = createContext(null);
export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {

  //Agregar productos
  //const [productsBase, setProductsBase] = useState([]);
  
  const [showAddModal, setShowAddModal] = useState(false);

  //Edicion de productos
  const [editingProduct, setEditingProduct] = useState(null);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  //Productos en memoria
  const [products, setProducts] = useState([]);
  //Contador de productos en pedido
  const [orderCount, setOrderCount] = useState(0);
  //productos en la cart
  const [cartProducts, setCartProducts] = useState([]);
  //modal Cart
  const [isCartModalVisible, setIsCartModalVisible] = useState(false);


  // Lógica para agregar el producto a la base de datos
  // const addProductToDatabase = (product) => {

  // };

  // Lógica para mostrar ModalAddProduct
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);


  // Función para abrir el modal con los datos del producto a editar
  const openEditModal = (product) => {
    console.log("dentro del context ", product);
    setEditingProduct(product);
    setIsEditModalVisible(true);
    console.log(isEditModalVisible);
  };

  // Función para cerrar el modal de edición
  const closeEditModal = () => {
    setEditingProduct(null);
    setIsEditModalVisible(false);
  };

  // Función para editar un elemento en la colección "menu"
  async function editFromDatabase(
    id,
    category,
    description,
    image,
    prize,
    title
  ) {
    try {
      // Referencia al documento en la colección "menu" con el ID proporcionado
      const db = getFirestore(firebaseApp);
      const menuRef = doc(db, "menu", id);

      // Actualiza el documento con los nuevos datos
      await updateDoc(menuRef, {
        category: category,
        descripcion: description,
        image: image,
        prize: prize,
        title: title,
      });

      console.log(`Document with ID ${id} has been updated.`);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }

  // Elimina producto desde firebase
  const removeFromDatabase = async (productId) => {
    try {
      const db = getFirestore(firebaseApp);
      const productRef = doc(db, "menu", productId);
      await deleteDoc(productRef);
      console.log(`Producto ${productId} eliminado con éxito`);

      // Actualizar el estado local después de eliminar el producto de Firebase
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== productId)
      );
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  //carga los productes de storage
  useEffect(() => {
    const savedCartProducts =
      JSON.parse(localStorage.getItem("cartProducts")) || [];
    setCartProducts(savedCartProducts);
    setOrderCount(savedCartProducts.length);
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
        console.log("productos cargados ", fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  //Agrega productos a Cart
  const generateUniqueId = () =>
    Math.random().toString(36).substring(2) + Date.now().toString(36);

  const addToCart = (product) => {
    const newCartProduct = {
      ...product,
      uniqueId: generateUniqueId(), // Asegura de que cada producto tenga un identificador único al ser añadido
    };

    const newCartProducts = [...cartProducts, newCartProduct];
    setCartProducts(newCartProducts);
    setOrderCount(newCartProducts.length);
    localStorage.setItem("cartProducts", JSON.stringify(newCartProducts));
  };

  //Elimina productos a Cart
  const removeFromCart = (productId) => {
    const newCartProducts = cartProducts.filter(
      (p) => p.uniqueId !== productId
    );
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
    hideCartModal,
    removeFromDatabase,
    editingProduct,
    openEditModal,
    closeEditModal,
    isEditModalVisible,
    editFromDatabase,
    //addProductToDatabase,
    showAddModal,
    handleShowAddModal,
    handleCloseAddModal,
    //productsBase
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
