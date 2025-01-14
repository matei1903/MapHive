import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styled from "styled-components";

const Container = styled.div`
  height: 600px;
  width: 80%;
  margin-top: 10% !important;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25),
              inset 0px 3px 10px rgba(0, 0, 0, 0.15);
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%); /* Center the buttons horizontally */
  z-index: 1000;
  display: flex;
  gap: 10px;
  background-color: transparent;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
`;

const Button = styled.button`
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #007bff;
    color: white;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;

const customMarkerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [0, -40],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [40, 40],
});

const Harta = () => {
  const [locatii, setLocatii] = useState([]);
  const [recenzii, setRecenzii] = useState([]);
  const [atribute, setAtribute] = useState([]); // State pentru atributele de filtrare
  const [filter, setFilter] = useState(''); // Filtrul selectat

  useEffect(() => {
    const fetchLocatii = async () => {
      try {
        const response = await axios.get('https://c6c3-86-124-206-15.ngrok-free.app/api/locatii', {
          headers: {
            "User-Agent": "CustomAgent/1.0"
          }
        });
        setLocatii(response.data);
      } catch (error) {
        console.error("Eroare la preluarea locațiilor:", error);
      }
    };

    const fetchRecenzii = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/recenzii');
        setRecenzii(response.data);
      } catch (error) {
        console.error("Eroare la preluarea recenziilor:", error);
      }
    };

    const fetchAtribute = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/atribute');
        setAtribute(response.data);
      } catch (error) {
        console.error("Eroare la preluarea atributelor:", error);
      }
    };

    fetchLocatii();
    fetchRecenzii();
    fetchAtribute();
  }, []);

  // Funcția pentru a actualiza locațiile pe baza filtrului
  const handleFilterChange = async (atribut) => {
    if (atribut === '') {
      // Dacă se apasă pe butonul "Toate", încarcă toate locațiile
      try {
        const response = await axios.get('http://localhost:8080/api/locatii');
        setLocatii(response.data); // Încarcă toate locațiile
      } catch (error) {
        console.error("Eroare la preluarea locațiilor:", error);
      }
    } else {
      // Dacă se apasă pe un buton de filtru, încarcă locațiile pe baza atributului selectat
      setFilter(atribut); // Setează filtrul selectat
      try {
        const response = await axios.get(`http://localhost:8080/api/atribute/locatii?numeAtribut=${atribut}`);
        setLocatii(response.data); // Actualizează locațiile în funcție de atribut
      } catch (error) {
        console.error("Eroare la preluarea locațiilor filtrate:", error);
      }
    }
  };

  return (
    <Container>
      <ButtonContainer>
        {atribute.map((atribut) => (
          <Button key={atribut.id} onClick={() => handleFilterChange(atribut.nume)}>
            {atribut.nume}
          </Button>
        ))}
        <Button onClick={() => handleFilterChange('')}>Toate</Button> {/* Resetare filtru */}
      </ButtonContainer>
      <h3>Filtrul activ: {filter || "Niciunul"}</h3> {/* Afișează filtru selectat */}

      <MapContainer center={[44.4268, 26.1025]} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%", position: "relative" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Array.isArray(locatii) && locatii.map((locatie) => {
          const locatieRecenzii = recenzii.filter(recenzie => recenzie.locatie && recenzie.locatie.id === locatie.id);

          return (
            <Marker
              key={locatie.id}
              position={[locatie.latitudine, locatie.longitudine]}
              icon={customMarkerIcon}
            >
              <Popup>
                <strong>{locatie.locatie_nume}</strong><br />
                <em>{locatie.locatie_adresa}</em><br />
                {locatie.descriere}<br />
                <strong>Tip:</strong> {locatie.tipLocatie?.nume}<br />
                <strong>Recenzii:</strong>
                <ul>
                  {locatieRecenzii.length > 0 ? (
                    locatieRecenzii.map((recenzie, index) => (
                      <li key={index}>
                        <strong>Rating:</strong> {recenzie.rating}/5<br />
                        <strong>Comentariu:</strong> {recenzie.comentariu}
                      </li>
                    ))
                  ) : (
                    <li>Nu există recenzii disponibile.</li>
                  )}
                </ul>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </Container>
  );
};

export default Harta;
