
import './Menu.css'
import Categories from '../Categories/Categories';
import ItemList from '../ItemList/ItemList';


function Menu() {
  return <nav className="topMenu">
    <Categories />
    <ItemList/>
  </nav>;
}

export default Menu;
