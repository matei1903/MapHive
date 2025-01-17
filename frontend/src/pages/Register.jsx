import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      username: email.split('@')[0], // Extract username from email
      email,
      parola: password,
    };

    try {
      const response = await fetch('https://30f5-188-26-188-176.ngrok-free.app/api/utilizatori/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify(payload),
      });

      const result = await response.text();

      if (result === 'Utilizator creat cu succes!') {
        navigate('/');
      } else {
        setError(result);
      }
    } catch (err) {
      setError('A apărut o eroare. Te rog să încerci din nou.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      color: 'black',
    }}>
      <img
        src="/logoMapHive.png"
        alt="Logo MapHive"
        style={{
          width: '150px',
          marginBottom: '20px',
        }}
      />
      <form onSubmit={handleRegister} style={{
        width: '300px',
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '20px',
          fontSize: '24px',
          color: 'black',
          fontFamily: '"Akaya Telivigala", serif',
        }}>
          Register
        </h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '5px',
              margin: '5px 0',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Parola:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '5px',
              margin: '5px 0',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </div>
        <button type="submit" style={{
          padding: '10px',
          width: '100%',
          backgroundColor: '#007BFF',
          color: '#ffffff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>
          Register
        </button>
        <p style={{
          textAlign: 'center',
          marginTop: '15px',
          fontSize: '14px',
        }}>
          Ai deja cont?{' '}
          <span
            onClick={handleLoginRedirect}
            style={{
              color: '#007BFF',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Conectează-te
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
