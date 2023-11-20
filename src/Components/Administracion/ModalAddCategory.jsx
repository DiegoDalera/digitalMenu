import { useState } from "react";
import { useProducts } from "../Hooks/ProductsContext";
import { Button, Modal, Form } from "react-bootstrap";

const ModalAddCategory = () => {
  const [newCategory, setNewCategory] = useState("");
  const {
    addCategoryToFirebase,
    isModalAddCategoryVisible,
    handleCloseModalAddCategory,
  } = useProducts();

  const handleAddCategory = () => {
    addCategoryToFirebase(newCategory);
    setNewCategory(""); // Limpiar el input después de agregar
  };

  return (
    <>
      <Modal
        show={isModalAddCategoryVisible}
        onHide={handleCloseModalAddCategory}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Agregas</Modal.Title>
        </Modal.Header>

        <Form.Label htmlFor="precio">Precio</Form.Label>
        <Form.Control
          id="precio"
          size="text"
          type="text"
          name="prize"
          onChange
        />

        <Modal.Footer>
          <Button onClick={handleAddCategory}>Agregar Categoría</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddCategory;
