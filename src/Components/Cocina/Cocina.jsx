/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { ProductsContext } from "../Hooks/ProductsContext";
import ModalLoginCocina from "./ModalLoginCocina";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import CocinaTopBar from "./CocinaTopBar";

const Cocina = () => {
  const { isAuthenticatedCocina, pedidos,onEliminarPedido  } = useContext(ProductsContext);


  return (
    <div className="logeo_cocina">
      {isAuthenticatedCocina ? (
        <>
          <CocinaTopBar />

          <div className="cocina-table">
            <Table responsive="sm" size="string">
              <thead>
                <th>ID Pedido</th>
                <th>Productos</th>
                <th>Hora del Pedido</th>
                <th>Acciones</th>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.id}</td>
                    <td>
                      {pedido.products.map((producto) => (
                        <span key={producto.uniqueId}>{producto.title}, </span>
                      ))}
                    </td>
                    <td>
                      {new Date(
                        pedido.timestamp.seconds * 1000
                      ).toLocaleTimeString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => onEliminarPedido(pedido.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      ) : (
        <ModalLoginCocina />
      )}
    </div>
  );
};

export default Cocina;
