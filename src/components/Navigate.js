import React from "react";
import { useNavigate } from "react-router-dom";

const Navigate = () => {
  const navigate = useNavigate();
  console.log(localStorage)

  const loginClick = () => {
    console.log('login button')
    navigate("/login");
  }
  const registerClick = () => {
    console.log('register button')
    navigate("/register");
  }
  const profileClick = () => {
    console.log("profile")
    navigate('/profile')
  }
  const logOutClick = () => {
    localStorage.clear();
    window.location.reload();
    console.log("hooray")
  }


  return (
    <nav>
      <h3>menu</h3>
      {/* {
        localStorage.getItem(result.data.token) !== null ? */}
      <>
        <button id="profile" onClick={profileClick}>My Profile </button>
        <button id="logout" onClick={logOutClick}>Logout</button>
      </>
      <><button id="login" onClick={loginClick}>Login</button>
        <button id="register" onClick={registerClick}>Register</button></>
    </nav >

  )

}
export default Navigate;