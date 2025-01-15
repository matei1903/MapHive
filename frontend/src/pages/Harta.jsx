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
  flex-direction: row;
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
  width: 350px;
  height: 70vh;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
  z-index: 1000;
  color: black;
`;

const FormContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #0056b3;
  }
`;

const PopupTitle = styled.h3`
  margin-top: 0;
`;

const PopupContent = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

const TextArea = styled.textarea`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
  &:hover {
    color: #007bff;
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
  const [selectedLocatie, setSelectedLocatie] = useState(null);
  const [rating, setRating] = useState(0);
  const [comentariu, setComentariu] = useState('');

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
  
  const handleSubmitReview = async () => {
    if (rating && comentariu) {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/recenzii/adauga/1`,  // Presupunând că 1 este utilizatorul
          {
            utilizatorId: 1,  // Exemplu de utilizator
            locatieId: selectedLocatie.id,
            rating,
            comentariu
          }
        );
        setRecenzii([...recenzii, response.data]);  // Adăugăm recenzia nouă la lista locală
        setRating(0);
        setComentariu('');
      } catch (error) {
        console.error("Eroare la adăugarea recenziei:", error);
      }
    } else {
      alert("Te rog completează ratingul și comentariul!");
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
          <CloseButton onClick={() => setSelectedLocatie(null)}>&times;</CloseButton>
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
          <FormContainer>
            <Input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Rating (1-5)"
              min="1"
              max="5"
            />
            <TextArea
              value={comentariu}
              onChange={(e) => setComentariu(e.target.value)}
              placeholder="Comentariu"
              rows="4"
            />
            <SubmitButton onClick={handleSubmitReview}>Trimite Recenzie</SubmitButton>
          </FormContainer>
        </PopupContainer>
      )}
    </Container>
  );
};

export default Harta;
