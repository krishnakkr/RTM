import { Marker, OverlayView } from '@react-google-maps/api';
import React,{useEffect, useState} from 'react'
import DustBinPng from '../../assets/Images/Dustbin.png';
import DumpYard from '../../assets/Images/DumpYard.png';
import GarbageVan from '../../assets/Images/GarbageVan.png'

const ExtraLocationsObject = () => {

    const [extraMarkers, setExtraMarkers] = useState([]);
    const extraMarkerItems=[
        {
            name: "Jyothipura_Dumpyard",
            location: {
            lat: 13.1026,
            lng: 77.7502,
            },
            percentage: -1
        },
        {
            name: "Gundur",
            location: {
            lat: 13.0862,
            lng: 77.7340,
            },
            percentage: 30
        },
        {
            name: "ashram",
            location: {
            lat: 13.0762,
            lng: 77.7164,
            },
            percentage: 40
        },
        {
            name: "BudigereCross",
            location: {
            lat: 13.0638,
            lng: 77.7456,
            },
            percentage: 68
        },
        {
            name: "hoskote_garbageVan",
            location: {
            lat: 13.0596,
            lng: 77.7706,
            },
            percentage: -1
        },

    ];
   

    const generateExtraMarkerComponent = async () => {
        const items = await Promise.all(extraMarkerItems.map(async (item) => {
          return (
            <div key={item.name}>
              <Marker position={item.location} 
                options={{
                  icon: {
                    url: (item.name==='Jyothipura_Dumpyard' ? DumpYard : (item.name==='hoskote_garbageVan') ? GarbageVan : DustBinPng),
                    scaledSize: new window.google.maps.Size(100, 100) 
                  }
                }}
              />
            {item.percentage !== -1 && <OverlayView
                position={item.location}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                getPixelPositionOffset={(width, height) => ({
                  x: -(width / 2),
                  y: -(height / 2),
                })}
              >
              <div style={{ position: 'absolute', background: 'black', padding: '5px', borderRadius: '5px', boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)', }}>
                <span style={{ color: 'white' }}>{`${item.percentage}%`}</span>
              </div>
            </OverlayView>
              }
            </div>
          );
        }));
        setExtraMarkers(items);
      };

      return {extraMarkers, generateExtraMarkerComponent, extraMarkerItems};
}

export default ExtraLocationsObject
