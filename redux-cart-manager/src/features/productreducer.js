const initialState = {
  product: "",
  quantity: 0,
  addtocart: false,
};

function productreducer(state = initialState, action) {
  switch (action.type) {
    case "addtocart":
      console.log(state);
      return {
        ...state,
        product: action.payload.productName,
        quantity: action.payload.quantity,
      };
    case "clearcart":
      return {
        ...state,
        product: "",
        quantity: 0,
      };
    case "updatequantity":
      return {
        ...state,
        quantity: action.payload,
      };
    default:
      return state;
  }
}
export function addtocart(productName, quantity) {
  return {
    type: "addtocart",
    payload: { productName, quantity },
  };
}

export default productreducer;
