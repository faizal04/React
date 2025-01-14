import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/helpers';
import DeleteBtn from './DeleteBtn';
import UpdateItem from './UpdateItem';
// import Button from '../../ui/Button';
// import { useDispatch } from 'react-redux';
// import { deleteItem } from './cartSlice';

function CartItem({ item }) {
  //eslint-disable-next-line
  const { pizzaId, name, quantity, totalPrice, unitPrice } = item;

  return (
    <li className="cursor-pointer list-none justify-between p-2 sm:flex sm:items-center">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="font-semibold">{formatCurrency(unitPrice)}</p>
        <UpdateItem pizzaid={pizzaId} quantity={quantity} />
        <DeleteBtn id={pizzaId} />
      </div>
    </li>
  );
}
CartItem.propTypes = {
  item: PropTypes.shape({
    pizzaId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
