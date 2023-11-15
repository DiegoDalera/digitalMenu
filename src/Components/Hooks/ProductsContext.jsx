/* eslint-disable react/prop-types */
import { createContext, useState, useContext,useEffect } from "react";
import { storage, db } from "../../Data/firebaseApp";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import firebaseApp from "../../Data/firebaseApp";

export const ProductsContext = createContext(null);
export const useProducts = () => useContext(ProductsContext);
export const ProductsProvider = ({ children }) => {

//AUtentificacion a administracion
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [showLoginModal, setShowLoginModal] = useState(true);

const handleLogin = (username, password) => {
  console.log(username, password)
  // Aquí implementas tu lógica de autenticación
  if (username === "admin@gmail.com" && password === "asdfghjk") {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    setShowLoginModal(false);
  } else {
    alert("Credenciales incorrectas");
  }
};

const handleLogout = () => {
  setIsAuthenticated(false);
  localStorage.removeItem('isAuthenticated');
  // Otros manejos de cierre de sesión si es necesario
};


  //Agregar productos modal
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

  // Lógica para mostrar y ocultar ModalAddProduct
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  // LOgica para subir el producto a firestore

  const uploadImageAndAddProduct = async (product, imageFile) => {
    try {
      // Subir la imagen a Firebase Storage
      const storageRef = ref(storage, `images/${imageFile.name}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
  
      // Obtener la URL de la imagen
      const imageUrl = await getDownloadURL(snapshot.ref);
  
      // Crear una referencia a un nuevo documento en la colección 'menu' con un ID automático
      const productRef = doc(collection(db, 'menu'));
  
      // Guardar la URL de la imagen y los datos del producto en Firestore
      await setDoc(productRef, {
        ...product,
        image:imageUrl
      });
  
      console.log('Producto añadido con éxito');
    } catch (error) {
      console.error('Error al subir la imagen y añadir el producto: ', error);
    }
  };
  

  // Función para abrir el modal con los datos del producto a editar
  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsEditModalVisible(true);
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

  //carga los productos de storage
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

  //cheque si el Admin esta logueado
  useEffect(() => {
    const storedAuthState = localStorage.getItem('isAuthenticated');
    if (storedAuthState === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  //Agrega productos a la Cart
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

  //Muestra el Modal cart
  const showCartModal = () => {
    setIsCartModalVisible(true);
  };

  //Oculta el Modal
  const hideCartModal = () => {
    setIsCartModalVisible(false);
  };

  //Value
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
    uploadImageAndAddProduct,
    showAddModal,
    handleShowAddModal,
    handleCloseAddModal,
    isAuthenticated,
    showLoginModal,
    handleLogin,
    handleLogout,
    setShowLoginModal
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
