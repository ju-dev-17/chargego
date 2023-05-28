import React from "react";
import useTheme from "../hooks/useTheme";

function FuelStationCard(station) {
  const [isDark, _switchTheme] = useTheme();

  const removeFromFav = (favStations) => {
    const index = favStations.indexOf(station.id);
    if (index > -1) {
      favStations.splice(index, 1);  
    }
    localStorage.setItem("favStations", favStations);
  };

  const addToFav = (favStations) => {
    favStations.push(station.id);
    localStorage.setItem("favStations", favStations);
  };

  const handleClick = (_event) => {
    const favStations = localStorage.getItem("favStations") || [];
    if (favStations.includes(station.id)) {
      removeFromFav(favStations);
    } else {
      addToFav(favStations);
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
            localStorage.getItem("favStations").includes(station.id)
              ? "/icons/heart.svg"
              : "/icons/heart-outline.svg"
          }
          alt="Favourite Button"
        />
        <h1 style={{ fontWeight: "300" }}>{station.station.tags?.operator}</h1>
        <div>
          <img src="/icons/car.png" alt="Car" />
        </div>
      </div>
    </div>
  );
}

export default FuelStationCard;
