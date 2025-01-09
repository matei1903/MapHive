import React, { createContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';  // Folosește doar importul modular

// Creează un context
export const FirebaseContext = createContext(null);

// FirebaseProvider pentru a furniza contextul
export const FirebaseProvider = ({ children }) => {
  const [firebaseApp, setFirebaseApp] = useState(null);

  useEffect(() => {
    // Inițializează Firebase doar o dată
    const firebaseConfig = {
      apiKey: "AIzaSyCr4K6xorHQJt366OETOIF4k-zetGuEYpg",
      authDomain: "maphive-6ebff.firebaseapp.com",
      databaseURL: "https://maphive-6ebff-default-rtdb.firebaseio.com",
      projectId: "maphive-6ebff",
      storageBucket: "maphive-6ebff.firebasestorage.app",
      messagingSenderId: "761305148246",
      appId: "1:761305148246:web:562af4cbf89c4f330884f7",
      measurementId: "G-4RD868MRF0"
    };

    if (!firebaseApp) {  // Dacă firebaseApp nu este deja setat
      const app = initializeApp(firebaseConfig);
      setFirebaseApp(app); // Setează aplicația Firebase
    }
  }, [firebaseApp]);  // Folosește un array gol pentru a executa doar o dată la montarea componentei

  return (
    <FirebaseContext.Provider value={firebaseApp}>
      {children}
    </FirebaseContext.Provider>
  );
};
