import { GoogleMap, Marker, Polyline, useJsApiLoader} from '@react-google-maps/api';
import DustBinPng from '../../assets/Images/Dustbin.png'
import { useEffect, useState } from 'react';

export default function GoogleMapView() {

  const { isLoaded } = useJsApiLoader({
    id: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
  })

  const containerStyle = {
    width: '100vw',
    height: '100vh'
  };
  
  const center = {
    lat: 12.9716,
    lng: 77.5946
  };

  const markers = [
    {
      name: "Marathalli",
      location: {
        lat: 12.9569,
        lng: 77.7011,
      },
    },
    {
      name: "Majestic",
      location: {
        lat: 12.9767,
        lng: 77.5713,
      },
    },
    {
      name: "Yelahanka",
      location: {
        lat: 13.1155,
        lng: 77.6070,
      },
    },

  ];

  const [directions, setDirections] = useState(null);
  useEffect(() => {
    if (isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();

      const waypoints = markers.map(marker => ({
        location: marker.location,
        stopover: true
      }));

      directionsService.route(
        {
          origin: markers[0].location,
          destination: markers[markers.length - 1].location,
          waypoints: waypoints.slice(1, -1), 
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  }, [isLoaded]);


  return isLoaded && (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >

    {markers.map((item)=>{
        return (
          <div key={item.name}>
            <Marker position={item.location} 
            options={{
              icon: {
                url: DustBinPng,
                scaledSize: new window.google.maps.Size(100, 100) 
              }
            }}
            />
          </div>
        )})
      }

      {directions && (
        <Polyline
          path={directions.routes[0].overview_path}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          }}
        />
      )}

      

    </GoogleMap>
) 
}