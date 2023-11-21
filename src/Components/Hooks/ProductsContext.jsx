/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import { storage, db } from "../../Data/firebaseApp";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  doc,
  setDoc,
  getFirestore,
  serverTimestamp,
  addDoc,
  collection,
  onSnapshot,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import firebaseApp from "../../Data/firebaseApp";

import Swal from "sweetalert2";

export const ProductsContext = createContext(null);
export const useProducts = () => useContext(ProductsContext);
export const ProductsProvider = ({ children }) => {

  //Actualizacion de precios en lote
  const handleUpdatePrize = async (percentageString) => {
   
    const percentage = Number(percentageString);

    if (!isNaN(percentage)) {
      try {
        const db = getFirestore(firebaseApp);
        const productsCol = collection(db, "menu");
        const snapshot = await getDocs(productsCol);

        snapshot.forEach(async (docSnapshot) => {
          let newPrize = docSnapshot.data().prize * (1 + percentage / 100);
          newPrize = Number(newPrize.toFixed(2));
          const docRef = doc(db, "menu", docSnapshot.id); // Corrección aquí
          await updateDoc(docRef, { prize: newPrize });
        });
      } catch (error) {
        console.error("Error al actualizar los precios:", error);
      }
    } else {
      console.log("Porcentaje no válido");
    }
  };

  //AUtentificacion  Administracion
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);

  const handleLogin = (username, password) => {
    console.log(username, password);
    // Aquí implementas tu lógica de autenticación
    if (username === "admin@gmail.com" && password === "asdfghjk") {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      setShowLoginModal(false);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  //Contador de productos en pedido
  const [orderCount, setOrderCount] = useState(0);

  // Lógica para mostrar y ocultar ModalAddProduct
  const [showAddModal, setShowAddModal] = useState(false);
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
      const productRef = doc(collection(db, "menu"));

      // Guardar la URL de la imagen y los datos del producto en Firestore
      await setDoc(productRef, {
        ...product,
        image: imageUrl,
      });

      console.log("Producto añadido con éxito");
    } catch (error) {
      console.error("Error al subir la imagen y añadir el producto: ", error);
    }
  };

  //Edicion de productos
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

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

  //Carga los productos de storage
  useEffect(() => {
    const savedCartProducts =
      JSON.parse(localStorage.getItem("cartProducts")) || [];
    setCartProducts(savedCartProducts);
    setOrderCount(savedCartProducts.length);
  }, []);

  //Productos en memoria
  const [products, setProducts] = useState([]);

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
    const storedAuthState = localStorage.getItem("isAuthenticated");
    if (storedAuthState === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  //Productos en la cart
  const [cartProducts, setCartProducts] = useState([]);

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

  //Cart Modal
  const [isCartModalVisible, setIsCartModalVisible] = useState(false);

  //Muestra el Modal cart
  const showCartModal = () => {
    setIsCartModalVisible(true);
  };

  //Oculta el Modal
  const hideCartModal = () => {
    setIsCartModalVisible(false);
  };

  //Enviar pedido
  const sendOrder = async () => {
    try {
      const db = getFirestore(firebaseApp);
      const ordersCol = collection(db, "pedidos");

      const totalPrice = cartProducts.reduce(
        (total, product) => total + product.prize,
        0
      );

      const order = {
        products: cartProducts,
        totalPrice: totalPrice.toFixed(2),
        timestamp: serverTimestamp(),
      };

      await addDoc(ordersCol, order);

      clearCart();
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
    }
  };

  const clearCart = () => {
    setCartProducts([]);
    localStorage.removeItem("cartProducts");
    setOrderCount(0);
    hideCartModal();
  };

  //AUtentificacion a Cocina
  const [isAuthenticatedCocina, setIsAuthenticatedCocina] = useState(
    localStorage.getItem("isAuthenticatedCocina") === "true"
  );

  const [showLoginModalCocina, setShowLoginModalCocina] = useState(true);

  const handleLoginCocina = (email, password) => {
    console.log(email, password);
    // Aquí implementas tu lógica de autenticación
    if (email === "admin@gmail.com" && password === "asdfghjk") {
      setIsAuthenticatedCocina(true);
      localStorage.setItem("isAuthenticatedCocina", "true");
      setShowLoginModalCocina(false);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const handleCocinaLogout = () => {
    setIsAuthenticatedCocina(false);
    localStorage.removeItem("isAuthenticated");
  };

  //Escuchar modificaciones de pedidos
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "pedidos"), (snapshot) => {
      const pedidosActualizados = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPedidos(pedidosActualizados);
    });

    return () => unsubscribe(); // Esto es importante para evitar fugas de memoria
  }, []);

  //Eliminar Pedido de Firebase
  const onEliminarPedido = async (productId) => {
    try {
      const db = getFirestore(firebaseApp);
      const productRef = doc(db, "pedidos", productId);
      await deleteDoc(productRef);
      Swal.fire(`Pedido ${productId} eliminado con éxito`);
      
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  // Seccion Categorias
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    console.log("Categories actualizadas: ", categorias);
  }, [categorias]);

  useEffect(() => {
    if (showAddModal) {
      obtenerCategorias();
    }
  }, [showAddModal]);

  const obtenerCategorias = async () => {
    try {
      const db = getFirestore(firebaseApp);
      const colectionCategories = collection(db, "categoriasDelMenu");
      const querySnapshot = await getDocs(colectionCategories);

      const categoriesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("obtener categoriesArray", categoriesArray);
      setCategorias(categoriesArray);
    } catch (error) {
      console.error("Error al obtener categorías: ", error);
    }
  };

  // Estado para controlar la visibilidad del modal
  const [isModalCategoryVisible, setIsModalCategoryVisible] = useState(false);

  // Función para mostrar el modal
  const handleShowModalCategory = () => setIsModalCategoryVisible(true);

  // Función para ocultar el modal
  const handleCloseModalCategory = () => setIsModalCategoryVisible(false);

  //Funcion para agregar una nueva categoria
  const addCategoryToFirebase = async (categoryName) => {
    if (!categoryName) return; // Comprobar que el nombre de la categoría no esté vacío
    try {
      const db = getFirestore(firebaseApp);
      const colectionCategories = collection(db, "categoriasDelMenu");

      await addDoc(colectionCategories, { categoria: categoryName });
    } catch (error) {
      console.error("Error al agregar categoría: ", error);
    }
  };

  // Estado para controlar la visibilidad del ModalAddCategory
  const [isModalAddCategoryVisible, setIsModalAddCategoryVisible] =
    useState(false);

  const handleShowModalAddCategory = () => setIsModalAddCategoryVisible(true);
  const handleCloseModalAddCategory = () => setIsModalAddCategoryVisible(false);

  //Eliminar Categoria de firebase:

  const handleDeleteCategory = async (categoryId) => {
    try {
      const db = getFirestore(firebaseApp);
      const productRef = doc(db, "categoriasDelMenu", categoryId);
      await deleteDoc(productRef);
      console.log(`Categoria ${categoryId} eliminado con éxito`);

      // Actualizar el estado categorias para reflejar la eliminación
      setCategorias(
        categorias.filter((category) => category.id !== categoryId)
      );
    } catch (error) {
      console.error("Error al eliminar la categoria", error);
    }
  };

  // modal aumentar precios en lote
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showImputPrizeModal = () => {
    setIsModalVisible(true);
  };

  const hideImputPrizeModal = () => {
    setIsModalVisible(false);
  };

  //Value
  const value = {
    isModalVisible,
    showImputPrizeModal,
    hideImputPrizeModal,
    handleDeleteCategory,
    isModalAddCategoryVisible,
    handleShowModalAddCategory,
    handleCloseModalAddCategory,
    addCategoryToFirebase,
    isModalCategoryVisible,
    handleShowModalCategory,
    handleCloseModalCategory,
    categorias,
    pedidos,
    onEliminarPedido,
    isAuthenticatedCocina,
    showLoginModalCocina,
    handleLoginCocina,
    handleCocinaLogout,
    sendOrder,
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
    setShowLoginModal,
    handleUpdatePrize,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
