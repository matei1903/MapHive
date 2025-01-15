import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 2%;
  left: 4%;
  z-index: 1000;
  display: flex;
  flex-direction: row; /* Butoanele pe linie */
  flex-wrap: wrap;
  gap: 10px;
  width: calc(100% - 20px);
`;

const Button = styled.button`
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
  padding: 6px 12px;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: 150px;
  text-align: center;

  &:hover {
    background-color: #007bff;
    color: white;
    transform: scale(1.05);
  }

  &.active {
    background-color: #007bff;
    color: white;
  }

  &:focus {
    outline: none;
  }
`;

const PopupContainer = styled.div`
  position: absolute;
  top: 10%;
  right: 10px;
  width: 350px;  // Lățime mai mare
  height: 70vh;  // Înălțime mai mare
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;  // Adaugă scroll dacă conținutul depășește înălțimea
  z-index: 1000;
`;

const PopupTitle = styled.h3`
  margin-top: 0;
`;

const PopupContent = styled.div`
  font-size: 14px;
  line-height: 1.5;
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
  const [atribute, setAtribute] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedLocatie, setSelectedLocatie] = useState(null);

  useEffect(() => {
    const fetchLocatii = async () => {
      try {
        const response = await axios.get('https://d466-86-124-206-15.ngrok-free.app/api/locatii', {
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        });
        setLocatii(response.data);
      } catch (error) {
        console.error("Eroare la preluarea locațiilor:", error);
      }
    };

    const fetchRecenzii = async () => {
      try {
        const response = await axios.get('https://d466-86-124-206-15.ngrok-free.app/api/recenzii', {
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        });
        setRecenzii(response.data);
      } catch (error) {
        console.error("Eroare la preluarea recenziilor:", error);
      }
    };

    const fetchAtribute = async () => {
      try {
        const response = await axios.get('https://d466-86-124-206-15.ngrok-free.app/api/atribute', {
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        });
        setAtribute(response.data);
      } catch (error) {
        console.error("Eroare la preluarea atributelor:", error);
      }
    };

    fetchLocatii();
    fetchRecenzii();
    fetchAtribute();
  }, []);

  const handleFilterChange = (atribut) => {
    let newFilters;
    if (filters.includes(atribut)) {
      newFilters = filters.filter((filter) => filter !== atribut);
    } else {
      newFilters = [...filters, atribut];
    }
    setFilters(newFilters);

    if (newFilters.length === 0) {
      axios.get('https://d466-86-124-206-15.ngrok-free.app/api/locatii', {
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      })
      .then(response => setLocatii(response.data))
      .catch(error => console.error("Eroare la preluarea locațiilor:", error));
    } else {
      axios.get(`https://d466-86-124-206-15.ngrok-free.app/api/atribute/locatii?numeAtribut=${newFilters.join(',')}`, {
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      })
      .then(response => setLocatii(response.data))
      .catch(error => console.error("Eroare la preluarea locațiilor filtrate:", error));
    }
  };

  return (
    <Container>
      <ButtonContainer>
        {atribute.map((atribut) => (
          <Button
            key={atribut.id}
            onClick={() => handleFilterChange(atribut.nume)}
            className={filters.includes(atribut.nume) ? 'active' : ''}
          >
            {atribut.nume}
          </Button>
        ))}
        <Button
          onClick={() => {
            setFilters([]);
            axios.get('https://d466-86-124-206-15.ngrok-free.app/api/locatii', {
              headers: {
                "ngrok-skip-browser-warning": "true"
              }
            })
            .then(response => setLocatii(response.data))
            .catch(error => console.error("Eroare la preluarea locațiilor:", error));
          }}
        >
          Toate
        </Button>
      </ButtonContainer>

      <MapContainer center={[44.4268, 26.1025]} zoom={13} scrollWheelZoom={false} style={{ height: "100vh", width: "100vw" }}>
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
              eventHandlers={{
                click: () => setSelectedLocatie(locatie)
              }}
            />
          );
        })}
      </MapContainer>

      {selectedLocatie && (
        <PopupContainer>
          <PopupTitle>{selectedLocatie.locatie_nume}</PopupTitle>
          <PopupContent>
            <strong>Adresă:</strong> {selectedLocatie.locatie_adresa}<br />
            <strong>Descriere:</strong> {selectedLocatie.descriere}<br />
            <strong>Tip:</strong> {selectedLocatie.tipLocatie?.nume}<br />
            <strong>Recenzii:</strong>
            <ul>
              {recenzii.filter(recenzie => recenzie.locatie.id === selectedLocatie.id).map((recenzie, index) => (
                <li key={index}>
                  <strong>Rating:</strong> {recenzie.rating}/5<br />
                  <strong>Comentariu:</strong> {recenzie.comentariu}
                </li>
              ))}
            </ul>
          </PopupContent>
        </PopupContainer>
      )}
    </Container>
  );
};

export default Harta;
