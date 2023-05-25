import React, { useEffect } from "react";

import useFuelStationApi from "../hooks/useFuelStationApi";
import FuelStationCard from "../components/FuelStationCard";

function Stations() {
  const data = useFuelStationApi();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div class="view" id="stations">
      {data.stations.map((station) => (
        <FuelStationCard station={station} />
      ))}
    </div>
  );
}

export default Stations;
