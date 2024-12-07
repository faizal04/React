import { func } from "prop-types";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CitiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    case "loaded":
      return {
        ...state,
        isLoading: false,
      };
    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "create/city":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };
    case "delete/city":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
        currentCity: {},
      };
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function getdata() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch("http://localhost:8000/cities");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        alert(err);
      } finally {
        dispatch({ type: "loaded" });
      }
    }
    getdata();
  }, []);
  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    try {
      dispatch({ type: "loading" });

      const res = await fetch(`http://localhost:8000/cities/${id}`);
      const data = await res.json();
      // setCurrentCity(data);
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch({ type: "loaded" });
    }
  }

  async function CreateCity(newCity) {
    try {
      dispatch({ type: "loading" });

      const res = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      // setcities((cities) => [...cities, data]);
      dispatch({ type: "create/city", payload: data });
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch({ type: "loaded" });
    }
  }

  async function DeleteCity(id) {
    try {
      dispatch({ type: "loading" });

      await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
      });

      // setcities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: "delete/city", payload: id });
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch({ type: "loaded" });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        CreateCity,
        DeleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function Cities() {
  const context = useContext(CitiesContext);
  return context;
}
export { CitiesProvider, Cities };
