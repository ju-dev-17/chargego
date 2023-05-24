import React, { useState, useEffect, useRef } from "react";

import { Map as OlMap, View } from "ol";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

import Marker from "../lib/Marker";

function Map() {
  const mapRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

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
        const isDark = localStorage.getItem("isDark");
        document.querySelector("canvas").style.filter = `${
          isDark === "true" ? "grayscale(80%) invert(100%)" : ""
        }`;
      });

      const userPosition = new Marker(coords);
      map.addLayer(userPosition.getMarker());

      setIsLoading(false);

      return map.setTarget(mapRef.current);
    }
  };

  const updateCoordinate = (callback) => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      return callback(coords);
    });
  };

  useEffect(() => {
    return () => updateCoordinate((coords) => setupMap(coords));
  }, []);

  return (
    <div className="view active-view" id="map" ref={mapRef}>
      {isLoading ? (
        <div className="ripples">
          <div className="ripples__dot"></div>
        </div>
      ) : (
        <img id="switch-theme-btn" alt="Switch theme" />
      )}
    </div>
  );
}

export default Map;
