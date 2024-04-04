"use client";

import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import trees from "../../data/trees";
import { Markers } from "../markers/page";

export default function Intro() {
  const position = { lat: 12.9337, lng: 77.6921 };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          center={position}
          zoom={9}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
          fullscreenControl={false}
        >
          {/* <Directions /> */}
          <Directions destinations={["Bommanahalli", "Marathalli", "Devasandra","Basavanagudi","Yelahanka","Domlur"]} />
          <Markers points={trees} />
        </Map>
      </APIProvider>
    </div>
  );
}

// function Directions() {
//   const map = useMap();
//   const routesLibrary = useMapsLibrary("routes");
//   const [directionsService, setDirectionsService] =
//     useState<google.maps.DirectionsService>();
//   const [directionsRenderer, setDirectionsRenderer] =
//     useState<google.maps.DirectionsRenderer>();
//   const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
//   const [routeIndex, setRouteIndex] = useState(0);
//   const selected = routes[routeIndex];
//   const leg = selected?.legs[0];

//   useEffect(() => {
//     if (!routesLibrary || !map) return;
//     setDirectionsService(new routesLibrary.DirectionsService());
//     setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
//   }, [routesLibrary, map]);

//   useEffect(() => {
//     if (!directionsService || !directionsRenderer) return;

//     directionsService
//       .route({
//         origin: "Koramangala",
//         destination: "Bommanahalli",//["dest1","des2"]
//         travelMode: google.maps.TravelMode.DRIVING,
//         provideRouteAlternatives: true,
//       })
//       .then((response) => {
//         directionsRenderer.setDirections(response);
//         setRoutes(response.routes);
//       });

//     return () => directionsRenderer.setMap(null);
//   }, [directionsService, directionsRenderer]);

//   useEffect(() => {
//     if (!directionsRenderer) return;
//     directionsRenderer.setRouteIndex(routeIndex);
//   }, [routeIndex, directionsRenderer]);

//   if (!leg) return null;

//   return (
//     <div className="directions">
//       <h2>{selected.summary}</h2>
//       <p>
//         {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
//       </p>
//       <p>Distance: {leg.distance?.text}</p>
//       <p>Duration: {leg.duration?.text}</p>

//       <h2>Other Routes</h2>
//       <ul>
//         {routes.map((route, index) => (
//           <li key={route.summary}>
//             <button onClick={() => setRouteIndex(index)}>
//               {route.summary}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


interface DirectionsProps {
  destinations: string[];
}

function Directions({ destinations }: DirectionsProps) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderers, setDirectionsRenderers] = useState<google.maps.DirectionsRenderer[]>([]);
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[][]>([]);

  useEffect(() => {
    if (!routesLibrary || !map) return;

    const service = new routesLibrary.DirectionsService();
    setDirectionsService(service);
    setDirectionsRenderers(destinations.map(() => new routesLibrary.DirectionsRenderer({ map })));

    return () => {
      setDirectionsService(null);
      setDirectionsRenderers([]);
    };
  }, [routesLibrary, map, destinations]);

  useEffect(() => {
    if (!directionsService || destinations.length === 0) return;

    Promise.all(destinations.map(destination =>
      directionsService.route({
        origin: "Marathalli",
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      })
    )).then(responses => {
      setRoutes(responses.map(response => response.routes));
      responses.forEach((response, index) => {
        directionsRenderers[index].setDirections(response);
      });
    });

    return () => {
      directionsRenderers.forEach(renderer => renderer.setMap(null));
    };
  }, [directionsService, directionsRenderers, destinations]);

  return null;
}