// const initialStateCustomer = {
//   fullname: "",
//   nationalId: "",
//   createdAt: "",
// };

// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullname: action.payload.fullname,
//         nationalId: action.payload.nationalId,
//         createdAt: action.payload.createdAt,
//       };
//     default:
//       return state;
//   }
// }

// export function createCustomer(fullname, nationalId) {
//   return {
//     type: "customer/createCustomer",
//     payload: {
//       fullname,
//       nationalId,
//       createdAt: new Date().toString(),
//     },
//   };
// }

////////////////////reduxToolKit////////////////////////////
import { createSlice } from "@reduxjs/toolkit";

const initialStateCustomer = {
  fullname: "",
  nationalId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: initialStateCustomer,
  reducers: {
    createCustomer: {
      prepare: function (fullname, nationalId) {
        return {
          payload: { fullname, nationalId, createdAt: new Date().toString() },
        };
      },
      reducer(state, action) {
        state.fullname = action.payload.fullname;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullname = action.payload;
    },
  },
});
export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;
