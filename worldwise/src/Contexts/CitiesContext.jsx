import { func } from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setcities] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function getdata() {
      try {
        setisLoading(true);
        const res = await fetch("http://localhost:8000/cities");
        const data = await res.json();
        setcities(data);
      } catch (err) {
        alert(err);
      } finally {
        setisLoading(false);
      }
    }
    getdata();
  }, []);
  async function getCity(id) {
    try {
      setisLoading(true);
      const res = await fetch(`http://localhost:8000/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setisLoading(false);
    }
  }
  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}
function Cities() {
  const context = useContext(CitiesContext);
  return context;
}
export { CitiesProvider, Cities };
