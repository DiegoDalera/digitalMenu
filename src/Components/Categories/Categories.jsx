
import { useProducts } from '../Hooks/ProductsContext';
import "./Categories.css";

function Categories({ onCategorySelect }) {
  
  const { products } = useProducts(); // Usamos el hook para acceder a los productos.
  
  // Obtenemos las categorías únicas a partir de los productos cargados en el contexto.
  const uniqueCategories = ["Todas", ...new Set(products.map(product => product.category))];

  return (
    <div className="categories">
      {uniqueCategories.map(category => (
        <div 
          key={category} 
          className="category-item"
          onClick={() => onCategorySelect(category === "Todas" ? null : category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
}

export default Categories;
