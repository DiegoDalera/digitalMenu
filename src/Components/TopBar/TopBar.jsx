/* eslint-disable react/prop-types */
import Cart from "../Cart/Cart";
import Logo from "../Logo/Logo";
import './TopBar.css';

function TopBar({ orderCount, onCartClick }) {
  return (
    <div className="topBar">
      <Logo />
      <Cart orderCount={orderCount} onCartClick={onCartClick} />
    </div>
  );
}


export default TopBar;

