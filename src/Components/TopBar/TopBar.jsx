import Cart from "../Cart/Cart";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import './TopBar.css'

function TopBar() {
  return (
    <div className="topBar">
      <Logo />
      <Search />
      <Cart />
    </div>
  );
}

export default TopBar;
