import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from '../../assets/logo.png';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (email === "admin@gmail.com" && password === "admin123") {
            navigate("/admin");
        } else {
            navigate("/home");
        }
    };

    return (
        <>
            <img src={logo} className="loginlogo" alt="logo" />
            <div className="login-container">
                <form onSubmit={handleLogin} className="form">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br/>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br/>
                    <button type="submit">Login</button>
                    <p className="forgetpassword" onClick={() => navigate("/forget-password")}>
                        Forget Password?
                    </p>
                </form>
            </div>
        </>
    );
}

export default Login;
