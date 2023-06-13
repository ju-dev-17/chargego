import React, { useEffect, useState } from "react";
import useTheme from "../hooks/useTheme";
import useDistanceCalc from "../hooks/useDistanceCalc";
import useRandomPrices from "../hooks/useRandomPrices";

function FuelStationCard({ station, coords }) {
  const [isDark, _switchTheme] = useTheme();
  const calcDistance = useDistanceCalc();
  const [distance, setDistance] = useState();
  const generatePrices = useRandomPrices();

  useEffect(() => {
    setDistance(
      (prevState) =>
        (prevState = calcDistance(
          station.lat,
          station.lon,
          coords.latitude,
          coords.longitude
        ))
    );
  }, []);

  const addToFav = () => {
    const favStations = localStorage.getItem("favStations");
    const favStationsArray = favStations ? JSON.parse(favStations) : [];
    const updatedStations = [...favStationsArray, station.id];
    localStorage.setItem("favStations", JSON.stringify(updatedStations));
  };

  const removeFromFav = () => {
    const favStations = localStorage.getItem("favStations");
    const favStationsArray = favStations ? JSON.parse(favStations) : [];
    const updatedStations = favStationsArray.filter(
      (item) => item !== station.id
    );
    localStorage.setItem("favStations", JSON.stringify(updatedStations));
  };

  const handleClick = (event) => {
    const favStations = localStorage.getItem("favStations") || [];
    if (favStations.includes(station.id)) {
      removeFromFav(favStations);
      event.target.src = "/icons/heart-outline.svg";
    } else {
      addToFav(favStations);
      event.target.src = "/icons/heart.svg";
    }
  };

  return (
    <div
      style={{ backgroundColor: isDark === "true" ? "#000437" : "#66cdaa" }}
      className="card"
      id={station.id}
    >
      <div className="card-header">
        <img src="/img/card-img-placeholder.svg" alt="Fuel Station" />
      </div>
      <div className="card-body">
        <img
          onClick={handleClick}
          className="card-fav-btn"
          src={
            (localStorage.getItem("favStations") || []).includes(station.id)
              ? "/icons/heart.svg"
              : "/icons/heart-outline.svg"
          }
          alt="Favourite Button"
        />
        <span>{distance} km</span>
        <div>
          <span style={{ fontWeight: "300" }}>{station.tags?.operator}</span>
          <span>{generatePrices(0.35, 0.42)}€</span>
        </div>
      </div>
    </div>
  );
}

export default FuelStationCard;
