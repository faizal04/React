import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

function Header() {
  return (
    <header className="m-h-16 font-roboto flex items-center justify-around border-b-2 border-stone-300 bg-yellow-500 px-4 py-3 uppercase sm:px-6 md:h-20">
      <Link to="/" className="font-bold">
        Fast-React-Pizza-CO.
      </Link>

      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
