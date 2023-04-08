import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router";
import HomeScreen from "./components/HomeScreen.js";
import Register from "./components/Register.js";
import Profile from "./components/Profile.js";
import Login from "./components/Login.js";
import Navigate from "./components/Navigate.js"
// import "./index.css";

const App = () => {

  const [loginOut, setLoginOut] = useState("");


  return (
    <div>
      <div>Howdy do</div>
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