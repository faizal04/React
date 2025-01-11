import Home from "./ui/Home";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import Cart from "./features/cart/Cart";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Order, { Loader as orderLoader } from "./features/order/Order";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
