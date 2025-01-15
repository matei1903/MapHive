import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
  top: 10%;
  left: 10%;
  z-index: 1000;
  display: flex;
  flex-direction: row; /* Butoanele pe linie */
  gap: 10px;
`;

const Button = styled.button`
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
  padding: 8px 20px;
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
