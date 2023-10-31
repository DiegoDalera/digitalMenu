
import products from '../../Data/products.json';
import "./Categories.css";

function Categories({ onCategorySelect }) {
  
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

