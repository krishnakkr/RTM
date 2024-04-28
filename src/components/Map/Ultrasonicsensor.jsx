
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const UltrasonicSensorDisplay = () => {
  const [distance, setDistance] = useState(0);
  
  useEffect(() => {
    const socket = io();
    socket.on('data', (data) => {
      const receivedDistance = parseFloat(data.substring(10));
      setDistance(receivedDistance);
    });
    
    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h1>Ultrasonic Sensor Display</h1>
      <div id="distance">Distance: {distance} cm</div>
    </div>
  );

  return {distance};
};

// export const {distance}

export default UltrasonicSensorDisplay;
