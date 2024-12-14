import { useSelector } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const state = useSelector((state) => state.account);
  return <div className="balance">{formatCurrency(state.balance)}</div>;
}

export default BalanceDisplay;
