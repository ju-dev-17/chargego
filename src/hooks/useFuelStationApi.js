import React from "react";

function useFuelStationApi() {
  const getData = async () => {
    const res = await fetch(
      `https://creativecommons.tankerkoenig.de/json/list.php?lat=${latitude}&lng=${longitude}&rad=${radius}&sort=price&type=diesel&apikey=e100136b-3fed-c5ba-6754-bbd3c50f7a9c`,
      {
        method: "GET",
        mode: "cors",
      }
    );

    const data = await res.json();

    return data;
  };

  return getData;
}

export default useFuelStationApi;
