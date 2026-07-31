// ======================================================
// main.jsx
// Blood & Organ Donor Management System
// ======================================================

import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter
} from "react-router-dom";


import App from "./App";


// Common Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


// Global Styles
import "./index.css";


ReactDOM.createRoot(
  document.getElementById("root")
)
.render(

  <React.StrictMode>

    <BrowserRouter>


      {/* Common Header */}
      <Navbar />


      {/* Application Routes */}
      <App />


      {/* Common Footer */}
      <Footer />


    </BrowserRouter>

  </React.StrictMode>

);