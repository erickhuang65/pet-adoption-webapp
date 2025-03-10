import React, { useEffect, useState } from 'react';
//import dotenv from 'dotenv'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '1200px',
  height: '400px',
  margin: '10px',
  padding: '5px'
};

const MapComponent = (props) => {

  const { center } = props;

  return (
    <LoadScript
      googleMapsApiKey = ""
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <Marker
          position={center}
          icon={{rl: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" 
          }}
        />
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default MapComponent;
