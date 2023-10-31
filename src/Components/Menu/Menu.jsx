import React, { useState } from 'react';
import './Menu.css'
import Categories from '../Categories/Categories';
import ItemList from '../ItemList/ItemList';


function Menu() {

  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <nav className="topMenu">
      <Categories onCategorySelect={setSelectedCategory} />
      <ItemList category={selectedCategory} />
    </nav>
  );
}

export default Menu;
