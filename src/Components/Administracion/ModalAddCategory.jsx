import { useState } from "react";
import { useProducts } from "../Hooks/ProductsContext";
import { Modal } from "react-bootstrap";

const ModalAddCategory = () => {
  const [newCategory, setNewCategory] = useState("");
  const { addCategoryToFirebase ,isModalAddCategoryVisible, handleCloseModalAddCategory } = useProducts();

  const handleAddCategory = () => {
    addCategoryToFirebase(newCategory);
    setNewCategory(""); // Limpiar el input después de agregar
  };

  return (
    <>
      <Modal show={isModalAddCategoryVisible} onHide={handleCloseModalAddCategory}>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nueva Categoría"
        />
        <button onClick={handleAddCategory}>Agregar Categoría</button>
      </Modal>
    </>
  );
};

export default ModalAddCategory;
