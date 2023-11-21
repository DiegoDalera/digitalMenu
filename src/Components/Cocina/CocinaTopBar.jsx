import './CocinaTopBar.css'
import { useContext } from "react";
import { ProductsContext } from "../Hooks/ProductsContext";

const CocinaTopBar = () => {

  const { handleCocinaLogout } = useContext(ProductsContext);

  return (
    <div className="cocinatopbar">
      CocinaTopBar
      <button className="btn btn-danger" onClick={handleCocinaLogout}>
        Desloguearse
      </button>
    </div>
  );
};

export default CocinaTopBar;