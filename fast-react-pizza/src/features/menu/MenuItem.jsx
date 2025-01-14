import { formatCurrency } from '../../utils/helpers';
import PropTypes from 'prop-types';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import DeleteBtn from '../cart/DeleteBtn';
import UpdateItem from '../cart/UpdateItem';

function MenuItem({ pizza }) {
  //eslint-disable-next-line
  const { id, name, unitPrice, ingredients, soldOut, imageUrl, quantity } =
    pizza;
  // eslint-disable-next-line
  const dispatch = useDispatch();

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  console.log(currentQuantity);
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  const quantityCheck = currentQuantity > 0;

  return (
    <li className="flex p-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-80 grayscale' : ''}`}
      />
      <div className="flex grow flex-col bg-slate-300">
        <p className="font-medium">{name}</p>
        <p className="te text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="font-semibold uppercase text-stone-500">Sold out</p>
          )}

          {quantityCheck && (
            <div className="flex gap-6">
              <UpdateItem pizzaid={id} quantity={currentQuantity} />

              <DeleteBtn id={id} />
            </div>
          )}

          {!soldOut && !quantityCheck && (
            <Button
              type="small"
              disabled={soldOut}
              size={12}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

MenuItem.propTypes = {
  pizza: PropTypes.shape({
    // id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    unitPrice: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    soldOut: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MenuItem;
