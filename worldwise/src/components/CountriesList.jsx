// import Cityitem from "./Cityitem";
import styles from "./CountryList.module.css";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import Message from "./Message";
import Countryitem from "./CountryItem";
import { Cities } from "../Contexts/CitiesContext";
function CountriesList() {
  const { cities, isloading } = Cities();
  if (isloading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="add your first city by clicking a city on the map" />
    );
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      console.log(arr);
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <Countryitem country={country} key={index} />
      ))}
    </ul>
  );
}
CountriesList.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      cityName: PropTypes.string.isRequired,
      emoji: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  isloading: PropTypes.bool.isRequired,
};

export default CountriesList;
