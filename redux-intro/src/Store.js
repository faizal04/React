// import { createStore, combineReducers, applyMiddleware } from "redux";
// import { thunk } from "redux-thunk";
// import accountReducer from "./features/account/accountSlice";
// import customerReducer from "./features/customers/customerSlice";

// const rootReducer = combineReducers({
//   account: accountReducer,
//   customer: customerReducer,
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));
// export default store;

///////////    Redux ToolKit///////////////////////////
import accountReducer from "./features/account/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});
export default store;
