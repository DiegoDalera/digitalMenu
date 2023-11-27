import React, { useState } from 'react';
import { useProducts } from '../Hooks/ProductsContext';
import "./Categories.css";

function Categories({ onCategorySelect }) {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const uniqueCategories = ["Todas", ...new Set(products.map(product => product.category))];

  const handleCategorySelect = (category) => {
    const selected = category === "Todas" ? null : category; // Establece a null si se selecciona "Todas"
    setSelectedCategory(selected);
    onCategorySelect(selected);
  };

  return (
    <div className="categories">
      {uniqueCategories.map(category => (
        <div 
          key={category} 
          className={`category-item ${selectedCategory === category || (category === "Todas" && selectedCategory === null) ? 'selected' : ''}`}
          onClick={() => handleCategorySelect(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
}

export default Categories;
