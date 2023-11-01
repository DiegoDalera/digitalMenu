/* eslint-disable react/prop-types */
import  { useState } from 'react';
import Categories from '../Categories/Categories';
import ItemList from '../ItemList/ItemList';

function Menu({onAddToOrder} ) {
  
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <nav className="topMenu">
      <Categories onCategorySelect={setSelectedCategory} />
      <ItemList category={selectedCategory} onAddToOrder={onAddToOrder} />
    </nav>
  );
}

export default Menu;


