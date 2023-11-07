import { useContext } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { ProductsContext } from "../Hooks/ProductsContext";
import  ModalAddProduct  from "./ModalAddEditProduct";

const Administracion = () => {
  const { products, removeFromDatabase, openEditModal } = useContext(ProductsContext); // Asumiendo que tienes una función removeFromCart en tu contexto

  const handleDelete = (productId) => {
    removeFromDatabase(productId);
  };

  const handleEdit = (productId) => {
    openEditModal(productId);
  };

  return (
    <div className="administracion-container">
      <div className="admin-title">
        <h2>Administración</h2>
      </div>
      <div className="add-product">
        <Button variant="success">Agregar +</Button>
      </div>
      <div className="admin-table">
        <Table responsive="sm" size="string">
          <thead>
            <tr>
              <th>#</th>
              <th>Categoría</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.category}</td>
                <td>{product.title}</td>
                <td>{product.descripcion}</td>
                <td>{product.prize}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Eliminar
                  </Button>{" "}

                  <Button variant="primary" onClick={() => handleEdit(product.id)}>
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <ModalAddProduct />
    </div>
  );
};

export default Administracion;
