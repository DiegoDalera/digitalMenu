import { useContext } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { ProductsContext } from "../Hooks/ProductsContext";
import ModalAddCategory from "./ModalAddCategory";

const ModalUpdateCategories = () => {
  const {
    categorias,
    isModalCategoryVisible,
    handleCloseModalCategory,
    handleShowModalAddCategory,
    handleDeleteCategory
  } = useContext(ProductsContext);

  return (
    <>
      <Modal show={isModalCategoryVisible} onHide={handleCloseModalCategory}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Manejo de Categorias
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Table responsive="sm" size="string">
            <thead>
              <tr>
                <th>#</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.categoria}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteCategory(product.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>

        <Button type="button" onClick={handleShowModalAddCategory}>
          agregar categoria
        </Button>
        <Button type="button" onClick={handleCloseModalCategory}>
          Cerrar
        </Button>
      </Modal>

      <ModalAddCategory />
    </>
  );
};

export default ModalUpdateCategories;
