import React, { useState } from "react";
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router-dom";
import SideNav from "./components/SideNav";
import Redirecter from "./components/Redirecter";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Community from "./components/Community";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Login from "./components/Login";

const App = () => {

  const [loginOut, setLoginOut] = useState("");


  return (
    <div>

      <SideNav loginOut={loginOut} setLoginOut={setLoginOut} />
      <Routes>
        <Route path="/" element={<Redirecter />} />
        <Route path='/register' element={<Register setLoginOut={setLoginOut} />} />
        <Route path='/login' element={<Login setLoginOut={setLoginOut} />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/community' element={<Community />} />
        <Route path='/settings' element={<Settings />} />

      </Routes>

    </div>
  )
};

const container = document.getElementById('root');
const root = createRoot(container)
root.render(<HashRouter>
  <App />
</HashRouter>
);