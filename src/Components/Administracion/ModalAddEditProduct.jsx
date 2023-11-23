import { useContext, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { ProductsContext } from "../Hooks/ProductsContext";
import Form from "react-bootstrap/Form";

const ModalAddEditProduct = () => {
  const {
    editingProduct,
    closeEditModal,
    isEditModalVisible,
    editFromDatabase,
  } = useContext(ProductsContext);

  // Estado para manejar los valores del formulario
  const [productToEdit, setProductToEdit] = useState({
    title: "",
    descripcion: "",
    category: "",
    prize: "",
    id: "",
    image: "",
  });

  // Actualiza el estado cuando editingProduct cambia
  useEffect(() => {
    if (editingProduct) {
      setProductToEdit(editingProduct);
    }
  }, [editingProduct]);

  // Si no hay producto para editar, no renderiza nada
  if (!editingProduct) {
    return null;
  }

  // Manejador para actualizar los valores del estado cuando cambian los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductToEdit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Función que envuelve la llamada a editFromDatabase con los valores actuales del estado
  const handleEdit = (event) => {
    event.preventDefault(); // Esto previene el comportamiento por defecto del formulario
    editFromDatabase(
      productToEdit.id,
      productToEdit.category,
      productToEdit.descripcion,
      productToEdit.image, // Necesitarás manejar la carga de archivos para obtener la URL de la imagen
      parseFloat(productToEdit.prize), // Asegúrate de convertir el precio a un número
      productToEdit.title
    );
    closeEditModal()
  };

  return (
    <Modal
      show={isEditModalVisible}
      onHide={closeEditModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editar Producto
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleEdit}>
          <Form.Control
            size="text"
            type="text"
            name="title"
            value={productToEdit.title} // Cambiado a productToEdit
            onChange={handleChange}
          />
          <br />
          <Form.Control
            type="text"
            name="descripcion"
            value={productToEdit.descripcion} // Cambiado a productToEdit
            onChange={handleChange}
          />
          <br />
          <Form.Control
            size="text"
            name="category"
            value={productToEdit.category} // Cambiado a productToEdit
            onChange={handleChange}
          />
          <br />
          <Form.Control
            size="text"
            type="text"
            name="prize"
            value={productToEdit.prize} // Cambiado a productToEdit
            onChange={handleChange}
          />
          <br />
          <Form.Control
            type="text"
            name="id"
            value={productToEdit.id} // Cambiado a productToEdit
            onChange={handleChange}
            disabled // El ID no debería cambiar, así que puedes deshabilitar este campo
          />
          <br />
          <Form.Control
            type="file"
            name="image"
            // El manejo de archivos será diferente ya que no se trata de un valor de texto
            onChange={handleChange}
          />
          <br />
          <Button type="button" onClick={closeEditModal}>
            Cerrar
          </Button>
          <Button type="submit">Editar</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddEditProduct;
