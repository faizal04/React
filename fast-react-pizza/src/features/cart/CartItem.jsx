import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';

function CartItem({ item }) {
  //eslint-disable-next-line
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="cursor-pointer list-none justify-between p-2 sm:flex sm:items-center">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
        <Button type="primary">Delete</Button>
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
