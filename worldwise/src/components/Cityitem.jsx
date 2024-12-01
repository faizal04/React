import PropTypes from "prop-types";
import styles from "./Cityitem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function Cityitem({ city }) {
  const { cityName, emoji, date } = city;
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deletebtn}>&times;</button>
    </li>
  );
}

// PropTypes validation
Cityitem.propTypes = {
  city: PropTypes.shape({
    cityName: PropTypes.string.isRequired, // The name of the city must be a string
    emoji: PropTypes.string.isRequired, // Emoji must be a string
    date: PropTypes.string.isRequired, // Date must be a string in a valid format
  }).isRequired,
};

export default Cityitem;
