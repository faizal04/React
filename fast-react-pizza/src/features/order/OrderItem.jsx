import { formatCurrency } from '../../utils/helpers';

//eslint-disable-next-line
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  console.log(item);
  //eslint-disable-next-line
  const { quantity, name, totalPrice } = item;

  return (
    <li className="flex divide-y-2 p-4">
      <div className="flex w-full items-center justify-between space-x-4 font-semibold">
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
