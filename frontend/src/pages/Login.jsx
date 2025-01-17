import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      email,
      parola: password,
    };

    try {
      const response = await fetch('https://6ac7-86-124-206-1.ngrok-free.app/api/utilizatori/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json(); // Așteaptă răspunsul ca JSON
      console.log("Răspuns server:", result);  // Verificăm răspunsul serverului

      // Verifică dacă autentificarea a fost reușită pe baza mesajului
      if (result.message === 'Autentificare reușită!') {
        // Salvează ID-ul utilizatorului în localStorage
        localStorage.setItem('utilizatorId', result.id);  // Folosim 'id' în loc de 'utilizatorId'

        // Navighează către pagina "harta"
        navigate('/harta');  // Navigare către /harta
      } else {
        // Afișează mesajul de eroare din răspunsul serverului
        setError(result.message);
      }
    } catch (err) {
      setError('A apărut o eroare. Te rog să încerci din nou.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleLogin} style={{ width: '300px' }}>
        <h2>Login</h2>
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
          Login
        </button>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          Nu ai un cont?{' '}
          <span
            onClick={handleRegisterRedirect}
            style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Înregistrează-te
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
