import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Button } from "react-bootstrap";
import { useContext } from "react";
import { ProductsContext } from "../Hooks/ProductsContext";
import { useState } from "react";
import Swal from "sweetalert2";

function ModalImputPrize() {
  const { isModalVisible, hideImputPrizeModal, handleUpdatePrize } =
    useContext(ProductsContext);

  const [percentageString, setPercentageString] = useState("");

  const handleInputChange = (e) => {
    setPercentageString(e.target.value);
  };

  const handleSubmit = () => {
    handleUpdatePrize(percentageString);
    Swal.fire("Precios actualizados correctamente");
    hideImputPrizeModal();
  };

  const isValidPercentage = (value) => {
    return value.trim() !== "" && !isNaN(Number(value)) && Number(value) >= 0;
  };

  return (
    <Modal
      show={isModalVisible}
      onHide={hideImputPrizeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ingresa el porcentaje
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="imput-prize">
          <Form.Label htmlFor="imput-prize">Ingresa el porcentaje</Form.Label>
          <Form.Control
            type="text"
            id="imput-prize"
            aria-describedby="imput-prize"
            value={percentageString}
            onChange={handleInputChange}
          />
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!isValidPercentage(percentageString)}
          >
            Ingresar
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default ModalImputPrize;
