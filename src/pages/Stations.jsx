import React from "react";

import FuelStationCard from "../components/FuelStationCard";

function Stations({ stations }) {
  return (
    <div className="view" id="stations">
      {stations?.elements &&
        stations.elements.map((station) => (
          <FuelStationCard key={station.id} station={station} />
        ))}
    </div>
  );
}

export default Stations;
