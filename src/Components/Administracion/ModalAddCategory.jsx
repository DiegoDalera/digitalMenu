import { useState } from "react";
import { useProducts } from "../Hooks/ProductsContext";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const ModalAddCategory = () => {
  const [newCategory, setNewCategory] = useState("");

  const {
    addCategoryToFirebase,
    isModalAddCategoryVisible,
    handleCloseModalAddCategory,
  } = useProducts();

  const handleAddCategory = (event) => {
    event.preventDefault();
    addCategoryToFirebase(newCategory);
    Swal.fire("Categoria agregada correctamente");
    setNewCategory("");
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

        <Form onSubmit={handleAddCategory}>
          <Form.Label htmlFor="categoriaNueva">
            Ingesa la nueva categoria
          </Form.Label>

          <Form.Control
            id="categoriaNueva"
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />

          <Button type="submit">Agregar Categoría</Button>
        </Form>

      </Modal>
    </>
  );
};

export default ModalAddCategory;
