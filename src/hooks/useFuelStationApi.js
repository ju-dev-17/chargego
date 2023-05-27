function useFuelStationApi({ latitude, longitude }) {
  const getData = async () => {
    if (latitude && longitude) {
      const res = await fetch(
        `https://overpass-api.de/api/interpreter?data=[out:json];(node["amenity"="charging_station"](around:5000,${latitude},${longitude});way["amenity"="charging_station"](around:5000,${latitude},${longitude});relation["amenity"="charging_station"](around:5000,${latitude},${longitude}););out;      `
      );
  
      const data = await res.json();
  
      return data;
    }
  };

  return getData;
}

export default useFuelStationApi;
