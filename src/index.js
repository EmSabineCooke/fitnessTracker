import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router";
import HomeScreen from "./components/HomeScreen.js";
import Register from "./components/Register.js";
import Profile from "./components/Profile.js";
import Login from "./components/Login.js";
import Search from "./components/Search.js"
// import "./index.css";

const App = () => {
  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/Search" element={<Search />} />
      </Routes>

    </div>
  )
};

ReactDOM.createRoot(
  <h1>Fitness Tracker</h1>,
  document.getElementById('root')).render(
    < React.StrictMode >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode >)