import { useActionData, useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import styles from "./Map.module.css";
import { useState } from "react";
function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [mapPositon, setMapPositon] = useState([40, 0]);
  // const position = navigator.geolocation.getCurrentPosition(showPosition);
  // function showPosition(position) {
  //   console.log(position);
  // }
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <MapContainer
        center={mapPositon}
        zoom={13}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapPositon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
