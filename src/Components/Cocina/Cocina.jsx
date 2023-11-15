import { useContext } from 'react';
import { ProductsContext } from '../Hooks/ProductsContext';
import ModalLoginCocina from "./ModalLoginCocina";

const Cocina = () => {
  const { isAuthenticatedCocina } = useContext(ProductsContext);

  return (
    <div className="logeo_cocina">
      {isAuthenticatedCocina ? (
        <h1>Cocina</h1>
      ) : (
        <ModalLoginCocina />
      )}
    </div>
  );
};

export default Cocina;
