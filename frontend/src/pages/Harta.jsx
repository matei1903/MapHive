//import '../App.css';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Configurare marker implicit
const customMarkerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png", // URL pentru marker
  iconSize: [30, 45], // Dimensiunea marker-ului
  iconAnchor: [15, 45], // Punctul de ancorare al marker-ului
  popupAnchor: [0, -40], // Punctul de ancorare al popup-ului
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png", // URL pentru umbră
  shadowSize: [40, 40], // Dimensiunea umbrei
});

const Harta = () => {
  return (
    <MapContainer center={[44.4268, 26.1025]} zoom={13} scrollWheelZoom={false} style={{height: "600px", width: "80%", marginTop: "10%"}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[44.4268, 26.1025]} icon={customMarkerIcon}>
        <Popup>
          Te dau cu capul de toti peretii <br /> Fraiere
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Harta;
