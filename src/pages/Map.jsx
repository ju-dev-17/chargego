import React, { useEffect, useRef } from "react";

import { Map as OlMap, View } from "ol";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

import Marker from "../lib/Marker";
import useFuelStationApi from "../hooks/useFuelStationApi";

function Map({
  isLoading,
  setIsLoading,
  isDark,
  switchTheme,
  setStations
}) {
  const mapRef = useRef(null);

  const setupMap = (coords) => {
    if (mapRef.current) {
      const map = new OlMap({
        target: mapRef.current,
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({
          center: fromLonLat([coords.longitude, coords.latitude]),
          zoom: 12,
        }),
      });

      map.on("postcompose", (_e) => {
        document.querySelector("canvas").style.filter = `${
          isDark === "true" ? "grayscale(80%) invert(100%)" : ""
        }`;
      });

      const userPosition = new Marker(coords);
      map.addLayer(userPosition.getMarker());

      const getData = useFuelStationApi(coords);

      getData().then((stations) => {
        setStations(stations);
        stations.elements.forEach((station) => {
          const stationPosition = new Marker({
            latitude: station.lat,
            longitude: station.lon,
          });
          map.addLayer(stationPosition.getMarker());
        });
      });

      return map.setTarget(mapRef.current);
    }
  };

  const updateCoordinate = (callback) => {
    setIsLoading((prevState) => (prevState = true));
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      return callback(coords);
    });
  };

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.style.filter = `${
        isDark === "true" ? "grayscale(80%) invert(100%)" : ""
      }`;
    }
  }, [isDark]);

  useEffect(() => {
    return () =>
      updateCoordinate((coords) => {
        setupMap(coords);
        setIsLoading((prevState) => (prevState = false));
      });
  }, []);

  return (
    <div className="view active-view" id="map" ref={mapRef}>
      {isLoading ? (
        <div
          className="ripples"
          style={{ "--uib-color": isDark === "true" ? "#000437" : "#66cdaa" }}
        >
          <div className="ripples__dot"></div>
        </div>
      ) : (
        <img
          onClick={() => {
            switchTheme();
          }}
          src={isDark === "true" ? "/icons/sun.svg" : "/icons/moon.svg"}
          alt="Switch theme"
          id="switch-theme-btn"
          style={{ backgroundColor: isDark === "true" ? "#000437" : "#66cdaa" }}
        />
      )}
    </div>
  );
}

export default Map;
