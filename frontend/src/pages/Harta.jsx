//import '../App.css';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Configurare marker implicit
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Harta = () => {
  return (
    <MapContainer center={[45.9432, 26.1025]} zoom={13} scrollWheelZoom={false} style={{height: "500px", width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <L.Marker position={[44.4268, 26.1025]}>
        <L.Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </L.Popup>
      </L.Marker>
    </MapContainer>
  );
};

export default Harta;
