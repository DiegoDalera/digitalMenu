import { useContext } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { ProductsContext } from "../Hooks/ProductsContext";
import ModalAddProduct from "./ModalAddProduct";
import ModalAddEditProduct from "./ModalAddEditProduct";
import ModalLoginAdmin from "./ModalLoginAdmin";
import AdminTopBar from "./AdminTopBar";
import ModalUpdateCategories from "./ModalUpdateCategories";
import ModalImputPrize from "./ModalImputPrize";

import "./Administracion.css";

const Administracion = () => {
  const {
    products,
    removeFromDatabase,
    openEditModal,
    handleShowAddModal,
    handleLogin,
    ShowLoginModal,
    setShowLoginModal,
    isAuthenticated,
    handleShowModalCategory,
    showImputPrizeModal,
  } = useContext(ProductsContext);

  const handleDelete = (productId) => {
    removeFromDatabase(productId);
  };

  const handleEdit = (product) => {
    openEditModal(product);
  };

  return (
    <div className="administracion-container">
      {isAuthenticated ? (
        <>
          <AdminTopBar />
          <div className="admin-title">
            <h2>Administración</h2>
          </div>

          <div className="admin-buttons">
            <div className="add-product">
              <Button variant="success" onClick={handleShowAddModal}>
                Agregar +
              </Button>
            </div>

            <div className="update-prize">
              <Button variant="success" onClick={showImputPrizeModal}>
                Actualizar precios
              </Button>
            </div>

            <div className="update-category">
              <Button variant="success" onClick={handleShowModalCategory}>
                Manejar Categorias
              </Button>
            </div>
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
                    <td>
                      {product.prize.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{ width: "50px" }}
                      />
                    </td>
                    <td className="acciones-admin">
                      <Button
                        variant="primary"
                        onClick={() => handleEdit(product)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        Eliminar
                      </Button>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <ModalAddProduct />
          <ModalAddEditProduct />
          <ModalUpdateCategories />
          <ModalImputPrize />
        </>
      ) : (
        <ModalLoginAdmin
          show={ShowLoginModal}
          onHide={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          backdrop="static"
          keyboard={false}
        />
      )}
    </div>
  );
};

export default Administracion;
