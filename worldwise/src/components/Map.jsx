import { useActionData, useNavigate, useSearchParams } from "react-router-dom";
import { useGeolocation } from "../hooks/GeoLocation.js";
import { useUrlPosition } from "../hooks/useUrlPosition.js";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMap,
  useMapEvent,
} from "react-leaflet";
import Button from "./Button.jsx";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { Cities } from "../Contexts/CitiesContext";
function Map() {
  // const navigate = useNavigate();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [lat, lng] = useUrlPosition();

  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = Cities();
  useEffect(
    function () {
      if ((lat, lng)) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <>
          <Button type="position" onClick={getPosition}>
            {isLoadingPosition ? "Loading..." : "Use Your Location"}
          </Button>
        </>
      )}

      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              😣
              <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
        {geolocationPosition && (
          <Marker position={mapPosition}>
            <Popup>
              Here You Are
              <br /> 👍
            </Popup>
          </Marker>
        )}
        <ChangeCenter mapPosition={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ mapPosition }) {
  const map = useMap();
  map.setView(mapPosition);

  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
export default Map;
