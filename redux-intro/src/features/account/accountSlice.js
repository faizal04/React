// const initialStateAccount = {
//   balance: 0,
//   loan: 0,
//   loanPurpose: "",
// };

// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//       };
//     case "account/withdraw":
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//       };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         balance: state.balance - state.loan,
//         loanPurpose: "",
//       };
//     default:
//       return state;
//   }
// }
// export function deposit(amount, currency) {
//   if (currency === "USD")
//     return {
//       type: "account/deposit",
//       payload: amount,
//     };
//   return async function (dispatch, getState) {
//     const res = await fetch(
//       `https://api.frankfurter.dev/v1/latest?base=USD&symbols=${currency}`
//     );
//     const data = await res.json();
//     // console.log(amount, data.rates[currency]);
//     const ConvertedAmount = +(amount * data.rates[currency]).toFixed(2);
//     console.log(ConvertedAmount);
//     dispatch({ type: "account/deposit", payload: ConvertedAmount });
//   };
// }

// export function withdraw(amount) {
//   return {
//     type: "account/withdraw",
//     payload: amount,
//   };
// }

// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: {
//       amount,
//       purpose,
//     },
//   };
// }

// export function payLoan() {
//   return {
//     type: "account/payLoan",
//   };
// }
import { createSlice } from "@reduxjs/toolkit";
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialStateAccount,
  reducers: {
    deposit(state, acion) {
      state.balance += acion.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;

        state.balance += action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.loan += action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loanPurpose = "";
      state.loan = 0;
    },
  },
});
export const { withdraw, payLoan, requestLoan } = accountSlice.actions;
export function deposit(amount, currency) {
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
    };
  return async function (dispatch, getState) {
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=USD&symbols=${currency}`
    );
    const data = await res.json();
    // console.log(amount, data.rates[currency]);
    const ConvertedAmount = +(amount * data.rates[currency]).toFixed(2);
    console.log(ConvertedAmount);
    dispatch({ type: "account/deposit", payload: ConvertedAmount });
  };
}
export default accountSlice.reducer;
