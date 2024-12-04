import Cityitem from "./Cityitem";
import styles from "./CityList.module.css";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import Message from "./Message";
import { Cities } from "../Contexts/CitiesContext";
function Citylist() {
  const { cities, isloading } = Cities();
  console.log(cities);
  if (isloading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="add your first city by clicking a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <Cityitem city={city} key={city.id} />
      ))}
    </ul>
  );
}
Citylist.propTypes = {
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

export default Citylist;
