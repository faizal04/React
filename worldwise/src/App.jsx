import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
// import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Form from "./components/Form";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import Citylist from "./components/Citylist";
import CountriesList from "./components/CountriesList";
import City from "./components/City";

// const BaseUrl = "http://localhost:8000/cities";
function App() {
  const [cities, setcities] = useState([]);
  const [isLoading, setisLoading] = useState(false);

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

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<Citylist cities={cities} isloading={isLoading} />}
          />
          <Route
            path="cities"
            element={<Citylist cities={cities} isloading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountriesList cities={cities} isloading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
