import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
//eslint-disable-next-line
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';
//eslint-disable-next-line
function UpdateItem({ pizzaid, quantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaid))}
      >
        -
      </Button>

      <span className="text-xl font-bold">{quantity}</span>
      <Button
        onClick={() => dispatch(increaseItemQuantity(pizzaid))}
        type="round"
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItem;
