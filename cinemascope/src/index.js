import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./components/StarRating";
function Test() {
  const [rated, setrated] = useState(0);
  return (
    <div>
      <StarRating color="green" setrated={setrated} />
      <p>this movie was rated {rated} </p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={7}
      color="white"
      size={40}
      fontSize={20}
      fontColor="white"
      message={["Terible", "Bad", "Good", "VeryGood", "Amazing"]}
      className="dark-theme"
      defaultRating={3}
    />
    <StarRating />
    <Test />
  </React.StrictMode>
);
