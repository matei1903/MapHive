//import '../App.css';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styled from "styled-components";

const Container = styled.div`
  height: 600px;
  width: 80%;
  margin-top: 10% !important;
  margin: 0 auto; /* Centrează pe orizontală */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px; 
  overflow: hidden; 
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25), 
              inset 0px 3px 10px rgba(0, 0, 0, 0.15); 
`;

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
    <Container>
      <MapContainer center={[44.5183, 26.1437]} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[44.5183, 26.1437]} icon={customMarkerIcon}>
        <Popup>
          Te dau cu capul de toti peretii <br /> Fraiere
        </Popup>
      </Marker>
    </MapContainer>
    </Container>
    
  );
};

export default Harta;
