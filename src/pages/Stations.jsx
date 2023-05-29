import React from "react";

import FuelStationCard from "../components/FuelStationCard";

function Stations({ stations, coords }) {
  return (
    <div className="view" id="stations">
      {stations?.elements &&
        stations.elements.map((station) => (
          <FuelStationCard key={station.id} coords={coords} station={station} />
        ))}
    </div>
  );
}

export default Stations;
