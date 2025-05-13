import React, { useState } from "react";
import './ForgetPassword.css';

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setMessage("");
            return;
        }

        // Simulate sending data to backend
        setMessage(`Password reset successful for ${email}`);
        setError("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="forget-password-container">
            <h2>Reset Your Password</h2>
            <p>Enter your email and new password to reset your credentials.</p>
            <form onSubmit={handleSubmit} className="forget-password-form">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Enter new password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Confirm new password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Reset Password</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
        </div>
    );
}

export default ForgetPassword;
