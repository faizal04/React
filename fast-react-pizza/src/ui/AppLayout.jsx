import Header from "./Header";

import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./loader";

function AppLayout() {
  const navigation = useNavigation();
  const isloading = navigation.state === "loading";
  return (
    <div className="layout">
      {isloading && <Loader />}
      <Header />
      <main>
        <p>content</p>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
