import React from "react";

function useDistanceCalc() {
  const degToRad = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const calcDistance = (lat1, lon1, lat2, lon2) => {
    const erdradius = 6371;

    const radLat1 = degToRad(lat1);
    const radLon1 = degToRad(lon1);
    const radLat2 = degToRad(lat2);
    const radLon2 = degToRad(lon2);

    const diffLat = radLat2 - radLat1;
    const diffLon = radLon2 - radLon1;

    const a =
      Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
      Math.cos(radLat1) *
        Math.cos(radLat2) *
        Math.sin(diffLon / 2) *
        Math.sin(diffLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const dist = erdradius * c;

    return dist.toFixed(2);
  };

  return calcDistance;
}

export default useDistanceCalc;
