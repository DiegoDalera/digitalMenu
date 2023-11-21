import { useState } from "react";
import { useProducts } from "../Hooks/ProductsContext";
import { Button, Modal, Form } from "react-bootstrap";
import './ModalAddCategory.css'
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
    handleCloseModalAddCategory();
  };

  return (
    <>
      <Modal
        show={isModalAddCategoryVisible}
        onHide={handleCloseModalAddCategory}
        className="modal-categoria"
      >
        <Modal.Header closeButton>
        
        </Modal.Header>

        <Form onSubmit={handleAddCategory}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label htmlFor="categoriaNueva">
              Ingesa la nueva categoria
            </Form.Label>

            <Form.Control
              id="categoriaNueva"
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </Form.Group>

          <Button type="submit">Agregar Categoría</Button>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddCategory;
