/* eslint-disable react/prop-types */
import Cart from "../Cart/Cart";
import Logo from "../Logo/Logo";
import './TopBar.css';

function TopBar({ orderCount }) {
  return (
    <div className="topBar">
      <Logo />
      <Cart orderCount={orderCount} />
    </div>
  );
}

export default TopBar;

