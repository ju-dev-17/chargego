import React, { useEffect, useRef, useState } from "react";

import { Feature, Map as OlMap, View } from "ol";
import Overlay from "ol/Overlay.js";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Point, LineString } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Icon, Stroke } from "ol/style";

import Marker from "../lib/Marker";
import useFuelStationApi from "../hooks/useFuelStationApi";
import useDistanceCalc from "../hooks/useDistanceCalc";
import useRandomPrices from "../hooks/useRandomPrices";

function Map({
  isLoading,
  setIsLoading,
  isDark,
  switchTheme,
  setStations,
  setCoords,
}) {
  const mapRef = useRef(null);
  const [_features, setFeatures] = useState([]);
  const calcDistance = useDistanceCalc();
  const generatePrices = useRandomPrices();

  const compareArrays = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  };

  const setupMap = (coords) => {
    if (mapRef.current) {
      const container = document.getElementById("popup");
      const content = document.getElementById("popup-content");
      const closer = document.getElementById("popup-closer");

      const overlay = new Overlay({
        element: container,
        autoPan: {
          animation: {
            duration: 250,
          },
        },
      });

      closer.onclick = () => {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
      };

      const map = new OlMap({
        target: mapRef.current,
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({
          center: fromLonLat([coords.longitude, coords.latitude]),
          zoom: 12,
        }),
        overlays: [overlay],
      });

      const getData = useFuelStationApi(coords);

      getData().then((stations) => {
        setStations(stations);

        const promises = Object.keys(stations.elements).map((key) => {
          const _Data = stations.elements[key];
          const feature = new Feature({
            geometry: new Point(
              fromLonLat([parseFloat(_Data.lon), parseFloat(_Data.lat)])
            ),
            category: "E-Fuel Station",
            title: _Data.tags?.operator,
            description: _Data.lat + ", " + _Data.lon,
          });
          return Promise.resolve(feature);
        });

        Promise.all(promises)
          .then((resolvedFeatures) => {
            setFeatures(resolvedFeatures);
            const markers = new VectorLayer({
              source: new VectorSource({
                features: resolvedFeatures,
              }),
              style: new Style({
                image: new Icon({
                  anchor: [0.5, 1],
                  src: "https://docs.maptiler.com/openlayers/default-marker/marker-icon.png",
                }),
              }),
            });

            map.addLayer(markers);
          })
          .catch((error) => {
            console.error(error);
          });
      });

      const vectorSource = new VectorSource();

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: new Style({
          stroke: new Stroke({
            color: "red",
            width: 3,
          }),
        }),
      });

      map.addLayer(vectorLayer);

      map.on("click", (evt) => {
        const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => {
          return feature;
        });
        if (feature) {
          const coordinates = feature.getGeometry().getCoordinates();
          const operator = feature.get("title");
          const latLon = feature.get("description").split(", ");

          content.innerHTML = `
          <div class="modal-content">
            <span>${operator ? operator : "Operator is unkown"}</span><br>
            <span>${generatePrices(0.35, 0.42)}€</span><br />
            <span>${calcDistance(
              latLon[0],
              latLon[1],
              coords.latitude,
              coords.longitude
            )} km distance</span>
          </div>
          `;
          overlay.setPosition(coordinates);
          container.style.display = "block";
        }
      });

      map.on("postcompose", (_e) => {
        document.querySelector("canvas").style.filter = `${
          isDark === "true" ? "grayscale(80%) invert(100%)" : ""
        }`;
      });

      const userPosition = new Marker(coords);
      map.addLayer(userPosition.getMarker());

      return map.setTarget(mapRef.current);
    }
  };

  const updateCoordinate = (callback) => {
    setIsLoading((prevState) => (prevState = true));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setCoords(coords);
        return callback(coords);
      },
      (error) => console.log("Geolocation error:", error.message)
    );
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
      <div id="popup" className="ol-popup modal">
        <a href="#" id="popup-closer" className="ol-popup-closer"></a>
        <div id="popup-content"></div>
      </div>
      {isLoading ? (
        <div
          className="ripples"
          style={{ "--uib-color": isDark === "true" ? "#000437" : "#66cdaa" }}
        >
          <div className="ripples__dot"></div>
        </div>
      ) : (
        <img
          onClick={switchTheme}
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
