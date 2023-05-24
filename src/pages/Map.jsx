import React, { useEffect, useRef } from "react";

import { Map as OlMap, View } from "ol";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

import Marker from "../lib/Marker";

function Map() {
  const ref = useRef(null);
  const mapRef = useRef(null);

  const setupMap = (coords) => {
    if (ref.current && !mapRef.current) {
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
    }
  };

  const updateCoordinate = (callback) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      callback(coords);
    });
  };

  useEffect(() => {
    updateCoordinate((coords) => setupMap(coords));
  }, [ref, mapRef]);

  return (
    <div className="view active-view" id="map" ref={ref}>
      <img id="switch-theme-btn" alt="Switch theme" />
      <div className="ripples ripples-active">
        <div className="ripples__dot"></div>
      </div>
    </div>
  );
}

export default Map;
