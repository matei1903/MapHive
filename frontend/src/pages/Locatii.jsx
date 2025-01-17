import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LocatiiUtilizator = () => {
  const [locatii, setLocatii] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Se încarcă locațiile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Locațiile adăugate de tine</h1>
      {locatii.length > 0 ? (
        <div style={{ display: 'grid', gap: '20px' }}>
          {locatii.map((locatie) => (
            <div
              key={locatie.id} // Asigură-te că "id" este un câmp unic pentru fiecare locație
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h2 style={{ margin: '0 0 10px' }}>{locatie.nume}</h2>
              <p><strong>Adresă:</strong> {locatie.adresa}</p>
              <p><strong>Descriere:</strong> {locatie.descriere}</p>
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
