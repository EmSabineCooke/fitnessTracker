import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { Routes, Route } from "react-router";
import RegisterForm from "./components/Register.js";
import Profile from "./components/Profile.js";
import Login from "./components/Login.js";
import Navigate from "./components/Navigate";
import HomePage from "./components/Home.js"
import Routines from "./components/Routines.js"
// import "./Activities.css";

const App = () => {
  return (
    <React.Fragment><Navigate />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/activities" element={<Activities />} />
      </Routes>
    </React.Fragment>
  )
};

const container = document.getElementById('root');
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
