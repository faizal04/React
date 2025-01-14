// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  // const cart = fakeCart;
  const user = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);
  const data = useSelector(getCart);
  console.log(data);
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }
  //eslint-disable-next-line
  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="p-2">
      <LinkButton to={'/menu'}>&larr; Back to menu</LinkButton>

      <h2 className="mb-4 mt-8 text-xl font-semibold">
        Your cart, <span className="font-bold uppercase underline">{user}</span>
      </h2>
      <ul className="mt-3 divide-y-2 divide-stone-400 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-3 space-x-3">
        <Button to={'/order/new'} type="primary">
          Order pizzas
        </Button>

        <Button onClick={handleClearCart} type="secondary">
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
