import React from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";

import { useRef, useEffect, useState } from "react";

const LoginForm = () => {
    // розібратись для чого
    const userRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMessage("");
    }, [user, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <section className="wrapper">
            <p
                ref={errorRef}
                // додати класи
                className={errorMessage ? "errormessage" : "offscreen"}
                aria-live="assertive"
            >
                {errorMessage}
            </p>

            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        placeholder="Username"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" />
                        Remember me
                    </label>
                    <a href="#">Forgot password?</a>
                </div>
                <button type="sumbit">Login</button>
            </form>
            <div className="register-link">
                {/* put router link here */}
                <p>
                    Don't have an account? <a href="#">Register</a>
                </p>
            </div>
        </section>
    );
};

export default LoginForm;
