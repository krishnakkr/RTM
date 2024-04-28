import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  OverlayView,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import DustBinPng from "../../assets/Images/Dustbin.png";
import DumpYard from "../../assets/Images/DumpYard.png";
import GarbageVan from "../../assets/Images/GarbageVan.png";
import { useEffect, useState } from "react";
import ExtraLocationsObject from "./ExtraLocationsObject";

export default function GoogleMapView({setLogin}) {
  setLogin(false);
  
  const { extraMarkers, generateExtraMarkerComponent, extraMarkerItems } =
    ExtraLocationsObject();

  const [reCreatePath, setReCreatePath] = useState(0);

  const [markerComponent, setMarkerComponent] = useState(null);

  const [markerItems, setMarkerItems] = useState([
    {
      name: "mittaganahalli_DumpYard",
      location: {
        lat: 13.1216,
        lng: 77.6207,
      },
      percentage: -1,
    },
    {
      name: "Bellahalli",
      location: {
        lat: 13.1005,
        lng: 77.6427,
      },
      percentage: 50,
    },
    {
      name: "Kannuru",
      location: {
        lat: 13.0927,
        lng: 77.6547,
      },
      percentage: 58,
    },
    // {
    //   name: "Yerappanahalli",
    //   location: {
    //     lat: 13.0865,
    //     lng: 77.6862,
    //   },
    //   percentage: 58
    // },
    {
      name: "Billeshavale",
      location: {
        lat: 13.0544,
        lng: 77.6709,
      },
      percentage: 58,
    },
    {
      name: "Narayanapura",
      location: {
        lat: 13.0629,
        lng: 77.645,
      },
      percentage: 58,
    },
    {
      name: "Sampigehalli_GarbageVan",
      location: {
        lat: 13.0804,
        lng: 77.6208,
      },
      percentage: -1,
    },
  ]);

  const { isLoaded } = useJsApiLoader({
    id: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  const containerStyle = {
    width: "100vw",
    height: "90vh",
  };

  const center = {
    lat: 13.0865,
    lng: 77.6862,
  };

  const UpdatedMarkers = [
    {
      name: "mittaganahalli_DumpYard",
      location: {
        lat: 13.1216,
        lng: 77.6207,
      },
      percentage: -1,
    },
    {
      name: "Bellahalli",
      location: {
        lat: 13.1005,
        lng: 77.6427,
      },
      percentage: 50,
    },
    {
      name: "Kannuru",
      location: {
        lat: 13.0927,
        lng: 77.6547,
      },
      percentage: 58,
    },
    {
      name: "Yerappanahalli",
      location: {
        lat: 13.0865,
        lng: 77.6862,
      },
      percentage: 58,
    },
    {
      name: "Billeshavale",
      location: {
        lat: 13.0544,
        lng: 77.6709,
      },
      percentage: 58,
    },
    {
      name: "Narayanapura",
      location: {
        lat: 13.0629,
        lng: 77.645,
      },
      percentage: 58,
    },
    {
      name: "Sampigehalli_GarbageVan",
      location: {
        lat: 13.0804,
        lng: 77.6208,
      },
      percentage: -1,
    },
  ];

  const generateMarkerComponent = async () => {
    const items = await Promise.all(
      markerItems.map(async (item) => {
        return (
          <div key={item.name}>
            <Marker
              position={item.location}
              options={{
                icon: {
                  url:
                    item.name === "mittaganahalli_DumpYard"
                      ? DumpYard
                      : item.name === "Sampigehalli_GarbageVan"
                      ? GarbageVan
                      : DustBinPng,
                  scaledSize: new window.google.maps.Size(100, 100),
                },
              }}
            />
            {item.percentage !== -1 && (
              <OverlayView
                position={item.location}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                getPixelPositionOffset={(width, height) => ({
                  x: -(width / 2),
                  y: -(height / 2),
                })}
              >
                <div
                  style={{
                    position: "absolute",
                    background: "black",
                    padding: "5px",
                    borderRadius: "5px",
                    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span
                    style={{ color: "white" }}
                  >{`${item.percentage}%`}</span>
                </div>
              </OverlayView>
            )}
          </div>
        );
      })
    );
    setMarkerComponent([...items, ...extraMarkers]);
  };

  const [directions, setDirections] = useState(null);

  useEffect(() => {
    setDirections((prev) => null);
    if (isLoaded && markerItems.length > 0) {
      const directionsService = new window.google.maps.DirectionsService();

      const waypoints = markerItems.map((marker) => ({
        location: marker.location,
        stopover: true,
      }));

      directionsService.route(
        {
          origin: markerItems[0].location,
          destination: markerItems[markerItems.length - 1].location,
          waypoints: waypoints.slice(1, -1),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections((prev) => result);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
    generateMarkerComponent();
    generateExtraMarkerComponent();
    drawExtraComponent();
  }, [isLoaded, reCreatePath]);

  const [extraDirections, setExtraDirections] = useState(null);

  const drawExtraComponent = async () => {
    setExtraDirections((prev) => null);
    if (isLoaded && markerItems.length > 0) {
      const directionsService = new window.google.maps.DirectionsService();
      if (extraMarkerItems?.length > 0) {
        const extraWaypoints = extraMarkerItems.map((marker) => ({
          location: marker.location,
          stopover: true,
        }));

        directionsService.route(
          {
            origin: extraMarkerItems[0].location,
            destination: extraMarkerItems[extraMarkerItems.length - 1].location,
            waypoints: extraWaypoints.slice(1, -1),
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              setExtraDirections((prev) => result);
            } else {
              console.error(`Error fetching directions: ${status}`);
            }
          }
        );
      }
    }
  };

  useEffect(()=>{
    setMarkerItems(prev=>[...prev]);
  },[])

  useEffect(() => {
    generateMarkerComponent();
    setReCreatePath((prev) => prev + 1);
  }, [markerItems]);

  useEffect(() => {
    generateMarkerComponent();
  }, [extraMarkers]);

  return (
    isLoaded && (
      <>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
          {markerComponent}

          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                preserveViewport: true,
              }}
            />
          )}
          {extraDirections && (
            <DirectionsRenderer
              directions={extraDirections}
              options={{
                suppressMarkers: true,
                preserveViewport: true,
              }}
            />
          )}
        </GoogleMap>

        <button
          className="bg-red-200 w-24 h-10"
          onClick={() => {
            setMarkerItems(UpdatedMarkers);
          }}
        >
          click
        </button>
      </>
    )
  );
}
