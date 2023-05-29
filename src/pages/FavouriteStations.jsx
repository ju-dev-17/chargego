import React from "react";

import FuelStationCard from "../components/FuelStationCard";
import useFuelStationApiById from "../hooks/useFuelStationApiById";

function FavouriteStations({ stations, coords }) {
  const getDataById = useFuelStationApiById(stations);

  return (
    <div className="view" id="favourite-stations">
      {(JSON.parse(localStorage.getItem("favStations")) || []).length !== 0 ? (
        JSON.parse(localStorage.getItem("favStations")).map(
          (stationId, index) => (
            <FuelStationCard key={index} coords={coords}  station={getDataById(stationId)} />
          )
        )
      ) : (
        <div style={{ display: "grid", placeItems: "center", height: "100%" }}>
          <span>No favourites are saved</span>
        </div>
      )}
    </div>
  );
}

export default FavouriteStations;
