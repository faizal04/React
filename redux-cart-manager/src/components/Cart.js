import { useSelector } from "react-redux";

function Cart() {
  const { product, quantity } = useSelector((state) => state.product);
  return (
    <div>
      <h1>Cart</h1>
      <h2>Your products are</h2>
      <div>{product}</div>
      <div>{quantity}</div>
    </div>
  );
}

export default Cart;
