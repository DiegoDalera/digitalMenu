/* eslint-disable react/prop-types */
import Cart from "../Cart/Cart";
import Logo from "../Logo/Logo";
import './TopBar.css';

function TopBar() {
  return (
    <div className="topBar">
      <Logo />
      <Cart  />
    </div>
  );
}


export default TopBar;

