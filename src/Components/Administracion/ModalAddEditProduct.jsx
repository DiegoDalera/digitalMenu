import { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { ProductsContext } from "../Hooks/ProductsContext";

const ModalAddEditProduct = () => {
  const { editingProduct, closeEditModal, isEditModalVisible } =
    useContext(ProductsContext);

  if (!editingProduct) {
    return null; // No renderiza nada si no hay un producto a editar
  }

  console.log(editingProduct)

  return (
    <Modal
      show={isEditModalVisible} // Controla la visibilidad con el estado isEditModalVisible
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
        {/* Aquí irían los inputs del formulario con los datos del producto a editar */}
        <h4>{editingProduct.title}</h4>
        {/* Más campos para editar el producto */}
      </Modal.Body>
      
      <Modal.Footer>
        <Button onClick={closeEditModal}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddEditProduct;
