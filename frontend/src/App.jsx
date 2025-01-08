//import logo from './logo.svg';
import './App.css';

import React, { Suspense } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FirebaseProvider } from "@quick-bite/components/context/Firebase";
const Harta = React.lazy(() => import(".pages/Harta.jsx"));
const router = createBrowserRouter([
  { path: "/", element: <Harta />},
]);
const GlobalStypes = createGlobalStyle`
  body {
    background: #202b1b;
    color: #fff;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, fantasy;
`;
const Loader = () => <div>loading...</div>;
export default () => {
  return (
    <FirebaseProvider>
      <GlobalStypes />
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </FirebaseProvider>
  );
};