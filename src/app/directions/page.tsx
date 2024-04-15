"use client";
import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import trees from "../../data/trees";
import dumpyards from "../../data/dumpyards";
import { Markers } from "../markers/page";

export default function Intro() {
  const position = { lat: 12.9337, lng: 77.6921 };
  const waypoints = trees.map((tree) => `${tree.lat},${tree.lng}`);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          center={position}
          zoom={9}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
          fullscreenControl={false}
        >
          <Directions
            origin={`${position.lat},${position.lng}`}
            destination={`${position.lat},${position.lng}`}
            waypoints={waypoints}
          />
         <Markers points={trees} type="tree" />
          <Markers points={dumpyards} type="dumpyard" />
        </Map>
      </APIProvider>
    </div>
  );
}

interface DirectionsProps {
  origin: string;
  destination: string;
  waypoints: string[];
}

function Directions({ origin, destination, waypoints }: DirectionsProps) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderers, setDirectionsRenderers] = useState<google.maps.DirectionsRenderer[]>([]);
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[][]>([]);

  useEffect(() => {
    if (!routesLibrary || !map) return;

    const service = new routesLibrary.DirectionsService();
    setDirectionsService(service);
    setDirectionsRenderers(new Array(waypoints.length).fill(null).map(() => new routesLibrary.DirectionsRenderer({ map })));

    return () => {
      setDirectionsService(null);
      setDirectionsRenderers([]);
    };
  }, [routesLibrary, map, waypoints]);

  useEffect(() => {
    if (!directionsService || !directionsRenderers.length || waypoints.length < 1) return;

    const calculateRoutes = async () => {
      const calculatedRoutes: google.maps.DirectionsRoute[][] = [];

      for (let i = 0; i < waypoints.length; i++) {
        const routeWaypoints = [
          origin,
          ...waypoints.slice(0, i + 1), // Include waypoints up to the current one
          destination
        ];

        const response = await new Promise<google.maps.DirectionsRoute | null>((resolve) => {
          directionsService.route({
            origin: routeWaypoints[0],
            destination: routeWaypoints[routeWaypoints.length - 1],
            waypoints: routeWaypoints.length > 2 ? routeWaypoints.slice(1, -1).map(waypoint => ({ location: waypoint, stopover: true })) : [],
            // optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              resolve(result?.routes[0] || null);
            } else {
              resolve(null);
            }
          });
          
        });

        if (response) {
          calculatedRoutes.push([response]);
        }
      }

      setRoutes(calculatedRoutes);
    };

    calculateRoutes();

    return () => {
      directionsRenderers.forEach(renderer => renderer.setMap(null));
    };
  }, [directionsService, origin, destination, waypoints, directionsRenderers]);

  useEffect(() => {
    if (routes.length > 0 && directionsRenderers.length > 0) {
      routes.forEach((route, index) => {
        const fakeResult = { request: {}, routes: route } as google.maps.DirectionsResult;
        if(directionsRenderers[index]) {
          directionsRenderers[index].setDirections(fakeResult);
        }
      });
    }
  }, [routes, directionsRenderers]);

  return null;
}
