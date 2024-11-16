import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./components/StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      color="yellow"
      size={40}
      fontSize={20}
      message={["Terible", "Bad", "Good", "VeryGood", "Amazing"]}
      className="dark-theme"
      // defaultRating={3}
    />
  </React.StrictMode>
);
