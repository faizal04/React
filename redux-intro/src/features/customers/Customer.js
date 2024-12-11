import { useSelector } from "react-redux";

function Customer() {
  const CustomerName = useSelector((store) => store.customer.fullname);
  console.log(Customer);
  return <h2>👋 Welcome, {CustomerName}</h2>;
}

export default Customer;
