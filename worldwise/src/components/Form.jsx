// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import Button from "./Button";
import DatePicker from "react-datepicker";
import styles from "./Form.module.css";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { func } from "prop-types";
import Message from "./Message";
import "react-datepicker/dist/react-datepicker.css";
import { Cities } from "../Contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPosition();
  const { CreateCity, isLoading } = Cities();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setemoji] = useState("");
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!lat && !lng) return;
      async function moveLocation() {
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          console.log(data);
          setCityName(data.city || data.locality);
          setCountry(data.countryName);
          setemoji(convertToEmoji(data.countryCode) || "😣");
          if (!data.city) {
            alert("No City Found X_X");
            setCityName("");
            setCountry("");
            setemoji("");
          }
        } catch (error) {
          console.log(error.message);
        }
      }
      moveLocation();
    },
    [lat, lng]
  );
  if (!lat && !lng)
    return <Message message="Start by Clicking Somewhere On the Map" />;
  function handleSubmit(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    console.log(newCity);
    CreateCity(newCity);
    navigate("/app");
  }
  return (
    <form
      className={`${styles.form} ${isLoading && styles.loading}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary"> Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
