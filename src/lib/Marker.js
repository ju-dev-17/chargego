import { Feature } from "ol";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Icon } from "ol/style";
import { fromLonLat } from "ol/proj";

export default class Marker {
  constructor(cords) {
    this.layer = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point(fromLonLat([cords.longitude, cords.latitude])),
          }),
        ],
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          crossOrigin: "anonymous",
          src: "https://docs.maptiler.com/openlayers/default-marker/marker-icon.png",
        }),
      }),
    });
  }

  getMarker() {
    return this.layer;
  }
}
