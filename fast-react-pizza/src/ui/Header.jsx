import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

function Header() {
  return (
    <header>
      <Link to="/">fast-pizza-CO.</Link>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, ipsum!</p>
      <SearchOrder />
    </header>
  );
}

export default Header;
