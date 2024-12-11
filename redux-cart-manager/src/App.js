import { useSelector } from "react-redux";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";

function App() {
  const product = useSelector((state) => state.product.product);
  return (
    <div>
      <AddProduct />
      {product && <Cart />}
    </div>
  );
}

export default App;
