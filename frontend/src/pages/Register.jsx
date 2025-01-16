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
      const response = await fetch('https://de9b-86-124-206-15.ngrok-free.app/api/utilizatori/register', {
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleRegister} style={{ width: '300px' }}>
        <h2>Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Parola:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', width: '100%' }}>
          Register
        </button>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          Ai deja cont?{' '}
          <span
            onClick={handleLoginRedirect}
            style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Conectează-te
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
