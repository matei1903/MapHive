import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

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
  top: 1px;
  left: 18%;
  background-color: white;
  padding: 5px;
  border: 1px solid black;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  gap: 10px;
  max-width: 50%;
  overflow-x: auto; /* Permite scroll pe orizontală */
  white-space: nowrap;
  padding-bottom: 10px;
  scrollbar-width: thin;
  scrollbar-color: #ccc #f0f0f0;
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f0f0f0;
  }
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

const SideMenu = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  width: ${({ isOpen }) => (isOpen ? "200px" : "60px")};
  display: flex;
  flex-direction: column;
  align-items: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};
  padding: ${({ isOpen }) => (isOpen ? "10px" : "0")};
  z-index: 9999;
`;

const SideMenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  margin: 5px 0;
  display: flex;
  align-items: center;
  justify-content: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};
  color: #333;
  font-size: 16px;
  width: 100%;
  &:hover {
    background-color: #f0f0f0;
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: ${({ isOpen }) => (isOpen ? "10px" : "0")};
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

const customMarkerIconRed = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [0, -40],
});

const newMarkerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854866.png",
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [0, -40],
});


const AddLocationMarker = ({ setLocatii }) => {
  const [newLocation, setNewLocation] = useState(null);
  const [locationData, setLocationData] = useState({
    nume: "",
    descriere: "",
    adresa: "",
    latitudine: null,
    longitudine: null,
  });

  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      return response.data.display_name; // Returnează adresa completă
    } catch (error) {
      console.error("Eroare la obținerea adresei:", error);
      return "";
    }
  };

  useMapEvents({
    click(e) {
      setNewLocation(e.latlng); // Setează poziția markerului nou
      setLocationData((prev) => ({
        ...prev,
        latitudine: e.latlng.lat,
        longitudine: e.latlng.lng,
      }));
      getAddressFromCoordinates(e.latlng.lat, e.latlng.lng).then((address) => {
        setLocationData((prev) => ({
          ...prev,
          adresa: address, // Setează automat adresa în formular
        }));
      });
    },
  });



  const handleAddLocation = async () => {
    if (locationData.nume && locationData.descriere && locationData.adresa) {
      try {
        const utilizatorId = localStorage.getItem("utilizatorId");
        if (!utilizatorId) {
          alert("Te rugăm să te autentifici pentru a adăuga o locație!");
          return;
        }

        const response = await axios.post(
          "https://de9b-86-124-206-15.ngrok-free.app/api/locatii-utilizator/adaugare",
          { ...locationData, utilizatorId: parseInt(utilizatorId) },
          { headers: { "ngrok-skip-browser-warning": "true" } }
        );

        setLocatii((prev) => [...prev, response.data]); // Actualizează lista locațiilor
        setNewLocation(null); // Resetează markerul temporar
        alert("Locația a fost adăugată cu succes!");
      } catch (error) {
        console.error("Eroare la adăugarea locației:", error);
        alert("A apărut o eroare. Te rugăm să încerci din nou!");
      }
    } else {
      alert("Te rugăm să completezi toate câmpurile!");
    }
  };


  return newLocation ? (
    <Marker position={newLocation} icon={newMarkerIcon}>
      <Popup>
        <FormContainer>
          <Input
            type="text"
            placeholder="Nume locație"
            value={locationData.nume}
            onChange={(e) =>
              setLocationData({ ...locationData, nume: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Adresă"
            value={locationData.adresa}
            onChange={(e) =>
              setLocationData({ ...locationData, adresa: e.target.value })
            }
          />
          <TextArea
            placeholder="Descriere"
            value={locationData.descriere}
            onChange={(e) =>
              setLocationData({ ...locationData, descriere: e.target.value })
            }
          />
          <SubmitButton onClick={handleAddLocation}>
            Adaugă locația
          </SubmitButton>
        </FormContainer>
      </Popup>
    </Marker>
  ) : null;
};

const Harta = () => {
  const [locatii, setLocatii] = useState([]);
  const [recenzii, setRecenzii] = useState([]);
  const [atribute, setAtribute] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedLocatie, setSelectedLocatie] = useState(null);
  const [rating, setRating] = useState(0);
  const [comentariu, setComentariu] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const navigate = useNavigate();
  const buttonContainerRef = useRef(null);
  const [locatiiUtilizator, setLocatiiUtilizator] = useState([]);


  useEffect(() => {
    const fetchLocatiiUtilizator = async () => {
      try {
        const utilizatorId = localStorage.getItem("utilizatorId");
        if (utilizatorId) {
          const response = await axios.get(
            `https://de9b-86-124-206-15.ngrok-free.app/api/locatii-utilizator/locatii/utilizator/${utilizatorId}`,
            {
              headers: { "ngrok-skip-browser-warning": "true" },
            }
          );
          setLocatiiUtilizator(response.data);
        }
      } catch (error) {
        console.error("Eroare la preluarea locațiilor utilizatorului:", error);
      }
    };

    fetchLocatiiUtilizator();
  }, []);

  useEffect(() => {
    const fetchLocatii = async () => {
      try {
        const response = await axios.get('https://de9b-86-124-206-15.ngrok-free.app/api/locatii', {
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
        const response = await axios.get('https://de9b-86-124-206-15.ngrok-free.app/api/recenzii', {
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
        const response = await axios.get('https://de9b-86-124-206-15.ngrok-free.app/api/atribute', {
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
      axios.get('https://de9b-86-124-206-15.ngrok-free.app/api/locatii', {
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      })
        .then(response => setLocatii(response.data))
        .catch(error => console.error("Eroare la preluarea locațiilor:", error));
    } else {
      axios.get(`https://de9b-86-124-206-15.ngrok-free.app/api/atribute/locatii?numeAtribut=${newFilters.join(',')}`, {
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
        // Obține utilizatorul ID din localStorage
        const utilizatorId = localStorage.getItem('utilizatorId');

        // Verifică dacă ID-ul există și este valid
        if (!utilizatorId) {
          alert("ID-ul utilizatorului nu a fost găsit în localStorage!");
          return;
        }

        const locatieId = selectedLocatie.id;  // ID-ul locației selectate

        const response = await axios.post(
          `https://de9b-86-124-206-15.ngrok-free.app/api/recenzii/adauga/${utilizatorId}`, {
          locatieId: locatieId,
          rating: rating,
          comentariu: comentariu
        }, {
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        });

        // Actualizează lista de recenzii cu recenzia adăugată
        setRecenzii([...recenzii, response.data]);

        // Resetează valorile inputurilor
        setRating(0);
        setComentariu('');
      } catch (error) {
        console.error("Eroare la adăugarea recenziei:", error);
      }
    } else {
      alert("Te rog completează ratingul și comentariul!");
    }
  };

  const handleWheel = (event) => {
    if (buttonContainerRef.current) {
      const container = buttonContainerRef.current;
      const scrollAmount = event.deltaY > 0 ? 100 : -100; // dacă se mișcă rotița în jos sau în sus
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
      event.preventDefault(); // Previne comportamentul implicit al scroll-ului pe verticală
    }
  };


  return (
    <Container>
      <SideMenu isOpen={isMenuOpen}>
        <SideMenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img src={`${process.env.PUBLIC_URL}/more.png`} alt="Menu" />
          {isMenuOpen && <span>Meniu</span>}
        </SideMenuButton>

        <SideMenuButton
          isOpen={isMenuOpen}
          onClick={() => navigate("/locatii")}
        >
          <img src={`${process.env.PUBLIC_URL}/bookmark.png`} alt="Save" />
          {isMenuOpen && <span>Salvat</span>}
        </SideMenuButton>

        <SideMenuButton
          isOpen={isMenuOpen}
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          <img src={`${process.env.PUBLIC_URL}/logout.png`} alt="Logout" />
          {isMenuOpen && <span>Delogare</span>}
        </SideMenuButton>
      </SideMenu>
      <ButtonContainer
        ref={buttonContainerRef}
        onWheel={handleWheel}
      >
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
            axios.get('https://de9b-86-124-206-15.ngrok-free.app/api/locatii', {
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

      <MapContainer center={[44.4268, 26.1025]} zoom={13} scrollWheelZoom={true} style={{ height: "100vh", width: "100vw" }}>
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
        {Array.isArray(locatiiUtilizator) && locatiiUtilizator.map((locatie) => (
          <Marker
            key={`utilizator-${locatie.id}`}
            position={[locatie.latitudine, locatie.longitudine]}
            icon={customMarkerIconRed}
            eventHandlers={{
              click: () => setSelectedLocatie(locatie),
            }}
          >
          </Marker>
        ))}
        <AddLocationMarker setLocatii={setLocatii} />
      </MapContainer>

      {selectedLocatie && (
        <PopupContainer>
          <CloseButton onClick={() => setSelectedLocatie(null)}>&times;</CloseButton>
          <PopupTitle>{selectedLocatie.locatie_nume || selectedLocatie.nume}</PopupTitle>
          <PopupContent>
          <strong>Adresă:</strong> {selectedLocatie.locatie_adresa || selectedLocatie.adresa}<br />
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