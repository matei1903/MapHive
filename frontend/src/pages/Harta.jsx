import '../App.css';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


const Harta = () => {
  return (
    <MapContainer center={[45.9432, 24.9668]} zoom={8} style={{ width: "66.67%", height: "50vh", margin: "0 auto", display: "block"  }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <Marker position={[44.4268, 26.1025]}>
      <Popup>
        Acesta este un popup pe hartă.
      </Popup>
    </Marker>
  </MapContainer>
  );
};

export default Harta;