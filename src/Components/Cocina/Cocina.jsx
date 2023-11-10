
import { useContext } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { ProductsContext } from "../Hooks/ProductsContext";

const Cocina = () => {
  
  return (
    <div className="orders-container">
      <div className="orders-title">
        <h2>Cocina</h2>
      </div>
      <div className="orders-table">
        <Table responsive="sm" size="string">
          <thead>
            <tr>
              <th>#</th>
              <th>Categoría</th>
              <th>Título</th>
              <th>Descripción</th>
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
                  <Button variant="danger">Eliminar</Button>{" "}
                  <Button variant="primary">Editar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Cocina;