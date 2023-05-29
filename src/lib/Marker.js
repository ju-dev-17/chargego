import { Feature } from "ol";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Icon } from "ol/style";
import { fromLonLat } from "ol/proj";

export default class Marker {
  constructor(coords) {
    this.layer = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point(
              fromLonLat([coords.longitude, coords.latitude])
            ),
          }),
        ],
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          crossOrigin: "anonymous",
          src: "https://ucarecdn.com/4b516de9-d43d-4b75-9f0f-ab0916bd85eb/marker.png",
        }),
      }),
    });
  }

  getMarker() {
    return this.layer;
  }
}
