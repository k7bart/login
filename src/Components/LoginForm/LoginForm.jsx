import React from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";

import { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthProvider";

import axios from "../../api/axios";
const LOGIN_URL = "/auth";

const LoginForm = () => {
    const { setAuth } = useContext(AuthContext);
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

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ user, password }),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            // roles from node.js course
            const roles = response?.data?.roles;
            setAuth({ user, password, roles, accessToken });
            setUser("");
            setPassword("");
            setSuccess(true);
        } catch (error) {}
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to home</a>
                    </p>
                </section>
            ) : (
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
            )}
        </>
    );
};

export default LoginForm;
