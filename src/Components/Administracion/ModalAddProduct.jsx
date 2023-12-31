import { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ProductsContext } from "../Hooks/ProductsContext";
import { useEffect } from "react";
import Swal from "sweetalert2";

const ModalAddProduct = () => {
  const {
    uploadImageAndAddProduct,
    showAddModal,
    handleCloseAddModal,
    categorias,
  } = useContext(ProductsContext);

  // Estado para manejar los valores del formulario
  const [productToAdd, setProductToAdd] = useState({
    title: "",
    descripcion: "",
    category: "",
    prize: "",
    image: "",
  });

  const [imageProducto, setImageProducto] = useState(null);

  // Estado para manejar la habilitación del botón de "Agregar"
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { title, descripcion, category, prize } = productToAdd;
    const hasValidData =
      title.trim() !== "" &&
      descripcion.trim() !== "" &&
      category !== "" &&
      !isNaN(prize) &&
      prize > 0;

    const isValidImage =
      imageProducto && ["image/jpeg", "image/png"].includes(imageProducto.type);

    setIsFormValid(hasValidData && isValidImage);
  }, [productToAdd, imageProducto]);

  // Maneja los cambios en los campos de texto del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "prize" ? Number(value) : value;
    setProductToAdd((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };

  // Maneja los cambios en el input de archivo de imagen
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImageProducto(e.target.files[0]);
    }
  };

  // Función para manejar la adición del producto
  const handleAdd = async (event) => {
    event.preventDefault();

    if (!productToAdd.category) {
      console.log(productToAdd);
      alert("Por favor, selecciona una categoría válida");
      return;
    }

    if (!imageProducto) {
      console.error("No hay imágenes para subir");
      return;
    }

    const productWithImage = {
      ...productToAdd,
      prize: Number(productToAdd.prize),
    };

    // Subir la imagen y añadir el producto
    try {
      await uploadImageAndAddProduct(productWithImage, imageProducto);
    } catch (error) {
      console.error("Error al subir imagen y añadir producto:", error);
      // Manejo adicional del error
      return;
    }

    // Después de agregar el producto, carga nuevamente la lista de productos
    Swal.fire("Producto actualizado correctamente");
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
          <Form.Label htmlFor="product">Producto</Form.Label>
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
            onChange={handleChange}
          />
          <br />
          <Form.Label htmlFor="categoria">Categoria</Form.Label>

          <Form.Select
            aria-label="Categoria"
            name="category"
            onChange={handleChange}
          >
            <option value="">Selecciona la categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.categoria}>
                {categoria.categoria}
              </option>
            ))}
          </Form.Select>

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

          <Form.Control type="file" name="image" onChange={handleImageChange} />
          <br />

          <Button type="button" onClick={handleCloseAddModal}>
            Cerrar
          </Button>
          <Button type="submit" disabled={!isFormValid}>
            Agregar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddProduct;
