import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LocatiiUtilizator = () => {
  const [locatii, setLocatii] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocatiiUtilizator = async () => {
      const utilizatorId = localStorage.getItem("utilizatorId"); // ID-ul utilizatorului din localStorage

      try {
        const response = await axios.get(
          `https://30f5-188-26-188-176.ngrok-free.app/api/locatii-utilizator/locatii/utilizator/${utilizatorId}`,
          { headers: { "ngrok-skip-browser-warning": "true" } }
        );
        setLocatii(response.data);
      } catch (err) {
        setError("Eroare la preluarea locațiilor utilizatorului.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocatiiUtilizator();
  }, []);

  const handleStergereLocatie = async (locatieId) => {
    const utilizatorId = localStorage.getItem("utilizatorId");

    try {
      await axios.delete(
        `https://30f5-188-26-188-176.ngrok-free.app/api/locatii-utilizator/sterge/${utilizatorId}/${locatieId}`
      );
      // După ce locația este ștearsă, actualizăm starea pentru a elimina locația din listă
      setLocatii(locatii.filter(locatie => locatie.id !== locatieId));
    } catch (err) {
      setError("Eroare la ștergerea locației.");
      console.error(err);
    }
  };

  if (loading) return <p>Se încarcă locațiile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1
        style={{
          fontFamily: "'Akaya Telivigala', serif",
          textAlign: "center",
        }}
      >
        Locațiile adăugate de tine
      </h1>
      <button
        onClick={() => navigate("/harta")}
        style={{
          display: "block",
          margin: "20px auto",
          padding: "10px 20px",
          fontSize: "16px",
          color: "#fff",
          backgroundColor: "#968b68",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Înapoi la hartă
      </button>
      {locatii.length > 0 ? (
        <div
          style={{
            display: "grid",
            gap: "20px",
            backgroundColor: "#d7c795",
            padding: "20px",
            borderRadius: "10px",
            color: 'black',
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {locatii.map((locatie) => (
            <div
              key={locatie.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                backgroundColor: 'white',
                color: 'black',
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2 style={{ margin: "0 0 10px" }}>{locatie.nume}</h2>
              <p><strong>Adresă:</strong> {locatie.adresa}</p>
              <p><strong>Descriere:</strong> {locatie.descriere}</p>
              <button
                onClick={() => handleStergereLocatie(locatie.id)}
                style={{
                  backgroundColor: "#b26666",
                  color: "black",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  zIndex: '9999',
                }}
              >
                Șterge locația
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Nu ai adăugat încă nicio locație.</p>
      )}
    </div>
  );
};

export default LocatiiUtilizator;
