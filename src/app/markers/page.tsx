"use client";

import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";
import { useEffect, useState, useRef } from "react";
import trees from "../../data/trees";
import dumpyards from "../../data/dumpyards";
import ultrasonics from "../../data/ultrasonic";

export default function Intro() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          center={{ lat: 12.9337, lng: 77.6921 }}
          zoom={10}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
        >
          <Markers points={trees} type="tree" />
          <Markers points={dumpyards} type="dumpyard" />
          {/* <Markers points={ultrasonics} type="ultrasonic" /> */}
          {/* <Directions/> */}
        </Map>
      </APIProvider>
    </div>
  );
}

type Point = google.maps.LatLngLiteral & { key: string };
type Props = { points: Point[]; type: "tree" | "dumpyard" | "ultrasonic" };

export const Markers = ({ points, type }: Props) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  const getSymbol = () => {
    if (type === "tree") {
      return "🗑️";
    } else if (type === "dumpyard") {
      return "🌳";
    }
    return "";
  };

  return (
    <>
      {points.map((point) => {
        const randomPercentage = Math.floor(Math.random() * 101);
        return (
          <AdvancedMarker
            position={point}
            key={point.key}
            ref={(marker) => setMarkerRef(marker, point.key)}
          >
            <span style={{ fontSize: "2rem" }}>{getSymbol()}</span>
            {type === "tree" && (
              <span style={{ fontSize: "1rem", color: "black" }}>
                {Math.floor(Math.random() * 101)}%
              </span>
            )}
          </AdvancedMarker>
        );
      })}
    </>
  );

};
