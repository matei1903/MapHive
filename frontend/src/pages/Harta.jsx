import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


const Harta = () => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ width: "100%", height: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          Acesta este un popup pe hartă.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Harta;