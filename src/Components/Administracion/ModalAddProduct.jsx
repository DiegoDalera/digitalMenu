import { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ProductsContext } from "../Hooks/ProductsContext";
import Form from "react-bootstrap/Form";

const ModalAddProduct = () => {

  const { addProductToDatabase, showAddModal , handleCloseAddModal } = useContext(ProductsContext);


// Estado para manejar los valores del formulario
const [productToAdd, setProductToAdd] = useState({
  title: "",
  descripcion: "",
  category: "",
  prize: "",
  image: "",
});


const handleChange = (e) => {
  const { name, value } = e.target;
  setProductToAdd((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

  // Función para manejar la adición del producto
  const handleAdd = (event) => {
    event.preventDefault();
    addProductToDatabase(productToAdd);
    handleCloseAddModal(); // Cierra el modal después de agregar el producto
  };

  return (
    <Modal
    show={showAddModal}
    onHide={handleCloseAddModal}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Agregar  Producto
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleAdd}>
          <Form.Control
            size="text"
            type="text"
            name="title"
            onChange={handleChange}
          />
          <br />
          <Form.Control
            type="text"
            name="descripcion"
          Cambiado a productToEdit
            onChange={handleChange}
          />
          <br />
          <Form.Control
            size="text"
            name="category"
          Cambiado a productToEdit
            onChange={handleChange}
          />
          <br />
          <Form.Control
            size="text"
            type="text"
            name="prize"
           
            onChange={handleChange}
          />
          <br />

            <Form.Control
            type="file"
            name="image"
            onChange={handleChange}
          />
          <br />
          <Button type="button" onClick={handleCloseAddModal}>
            Cerrar
          </Button>
          <Button type="submit" onClick={addProductToDatabase}>Agregar</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddProduct;
