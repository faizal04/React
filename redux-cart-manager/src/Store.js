import productreducer from "./features/productreducer";
import { combineReducers, createStore } from "redux";

const rootreducer = combineReducers({
  product: productreducer,
});
const store = createStore(rootreducer);
export default store;
