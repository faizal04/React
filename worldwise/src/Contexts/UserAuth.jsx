import { createContext, useContext, useReducer } from "react";

const Authcontext = createContext();
const initialState = {
  user: null,
  authorized: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        authorized: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        authorized: false,
      };
  }
}
function UserAuth({ children }) {
  const [{ user, authorized }, dispatch] = useReducer(reducer, initialState);

  const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({
        type: "login",
        payload: FAKE_USER,
      });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <Authcontext.Provider value={{ login, logout, user, authorized }}>
      {children}
    </Authcontext.Provider>
  );
}
function useAuth() {
  const context = useContext(Authcontext);
  if (context === undefined) throw new error("unknown login attempt");
  return context;
}
export { UserAuth, useAuth };
