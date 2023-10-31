
import products from '../../Data/products.json'; 
import "./Categories.css";

function Categories() {
  // Extrae las categorías únicas usando un conjunto (Set)
  const uniqueCategories = [...new Set(products.map(product => product.category))];

  return (
    <div className="categories">
      {uniqueCategories.map(category => (
        <div key={category} className="category-item">
          {category}
        </div>
      ))}
    </div>
  );
}

export default Categories;

