//import logo from './logo.svg';
import './App.css';

import React, { Suspense } from "react";
import { createGlobalStyle } from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FirebaseProvider } from "./context/FirebaseContext";
const Harta = React.lazy(() => import("./pages/Harta"));
const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const Locatii = React.lazy(() => import("./pages/Locatii"));
const router = createBrowserRouter([
  { path: "/", element: <Login />},
  { path: "/harta", element: <Harta />},
  { path: "/register", element: <Register />},
  { path: "/locatii", element: <Locatii />},
]);
const GlobalStypes = createGlobalStyle`
  body {
    background: #d7c795;
    color: #fff;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, fantasy;
`;
const Loader = () => <div>loading...</div>;
const App = () => {
  return (
    <FirebaseProvider>
      <GlobalStypes />
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </FirebaseProvider>
  );
};

export default App;
