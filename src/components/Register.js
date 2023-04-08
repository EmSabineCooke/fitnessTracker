import React, { useState } from "react";
import Axios from "axios";

const RegisterForm = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const handleRegister = async () => {
        if (password.length < 6 || confirmPassword.length < 6) {
            setMessage("Passwords must be at least 6 characters long.")
        }
        if (password === confirmPassword) {
            try {
                const response = await Axios.get('/api/users/register', { username: userName, password: password });
                if (response.success) {
                    window.localStorage.setItem("Fitness-Trackr-Login", result.data.token);
                    console.log("Login Successful");
                    setMessage("Login Successful");
                    navigate("/");
                    window.location.reload(false);
                }
            } catch (error) {
                console.error(error);
            }
            if (window.localStorage.getItem("Fitness-Trackr-Login")) {
                setMessage("You have successfully registered!");
            } else {
                setMessage("Something went wrong.");
            }
        } else {
            setMessage("Passwords don't match. Try again.")
        }
    }
    return (
        <div id="register-form">
            <form>
                <label>Username
                    <input type="text" onChange={event => setUserName(event.target.value)} />
                </label>
                <label>Password
                    <input type="text" minLength="6" onChange={event => setPassword(event.target.value)} />
                </label>
                <label>Confirm Password
                    <input type="text" minLength="6" onChange={event => setConfirmPassword(event.target.value)} />
                </label>
            </form>
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}

export default RegisterForm;