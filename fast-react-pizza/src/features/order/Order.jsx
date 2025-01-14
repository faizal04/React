// Test ID: IIDSAT
import OrderItem from './OrderItem';
import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { useEffect } from 'react';
import UpdateOrder from './UpdateOrder';

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
    },
    [fetcher],
  );
  console.log(fetcher.data);

  const {
    // eslint-disable-next-line no-unused-vars
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    // eslint-disable-next-line no-unused-vars
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  // console.log(cart);

  return (
    <div className="mt-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-roboto text-xl font-extrabold">
          Order #{id} Status
        </h2>

        <div className="gap-3 space-x-3">
          {priority && (
            <span className="rounded-full bg-red-500 p-2 font-semibold uppercase tracking-wide text-stone-200">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 p-2 font-semibold uppercase tracking-wide text-stone-200">
            {status} order
          </span>
        </div>
      </div>

      <div className="font-stone-50 mb-4 flex flex-wrap items-center justify-between gap-4 bg-stone-400 p-2 text-stone-700">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y-2 divide-stone-500 border-b-2 border-stone-500">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.id}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher.data?.find((el) => el.id === item.pizzaId).ingredients ??
              []
            }
          />
        ))}
      </ul>

      <div className="font-stone-50 mb-4 mt-4 items-center justify-between space-y-4 bg-stone-400 p-2 text-stone-700">
        <p className="flex w-full justify-between font-semibold">
          Price pizza: <span>{formatCurrency(orderPrice)}</span>
        </p>
        {priority && (
          <p className="flex w-full justify-between font-semibold">
            Price priority:<span>{formatCurrency(priorityPrice)}</span>
          </p>
        )}
        <p className="flex w-full justify-between font-bold">
          To pay on delivery:{' '}
          <span className="underline">
            {formatCurrency(orderPrice + priorityPrice)}
          </span>
        </p>
        {!priority && <UpdateOrder order={order} />}
      </div>
    </div>
  );
}
export async function Loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
