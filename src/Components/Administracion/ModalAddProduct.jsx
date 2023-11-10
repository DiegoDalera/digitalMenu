import { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ProductsContext } from "../Hooks/ProductsContext";
import Form from "react-bootstrap/Form";

const ModalAddProduct = () => {
  const { addProductToDatabase, showAddModal, handleCloseAddModal } =
    useContext(ProductsContext);

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
    const updatedValue = name === "prize" ? Number(value) : value;
    setProductToAdd((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };
  

  // Función para manejar la adición del producto
  const handleAdd = (event) => {
    event.preventDefault();
    const productWithImage = {
      ...productToAdd,
      prize: Number(productToAdd.prize), 
      image: "/img/items/ensalada-cesar.jpg" 
    };
    addProductToDatabase(productWithImage);
    handleCloseAddModal(); 
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
          Agregar Producto
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleAdd}>
          <Form.Label htmlFor="product">Password</Form.Label>
          <Form.Control
            id="product"
            size="text"
            type="text"
            name="title"
            onChange={handleChange}
          />
          <br />
          <Form.Label htmlFor="descripcion">Descripcion</Form.Label>
          <Form.Control
            id="descripcion"
            type="text"
            name="descripcion"
            Cambiado
            a
            productToEdit
            onChange={handleChange}
          />
          <br />
          <Form.Label htmlFor="categoria">Categoria</Form.Label>
          <Form.Control
            id="categoria"
            size="text"
            name="category"
            Cambiado
            a
            productToEdit
            onChange={handleChange}
          />
          <br />
          <Form.Label htmlFor="precio">Precio</Form.Label>
          <Form.Control
            id="precio"
            size="text"
            type="text"
            name="prize"
            onChange={handleChange}
          />
          <br />

          <Form.Control type="file" name="image" onChange={handleChange} />
          <br />
          <Button type="button" onClick={handleCloseAddModal}>
            Cerrar
          </Button>
          <Button type="submit">
            Agregar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddProduct;
