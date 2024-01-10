import React from "react";
import { useRef, useState, useEffect } from "react";
import { FaUser, FaCheck, FaBan, FaInfoCircle, FaLock } from "react-icons/fa";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$%^&*()-+=])[a-zA-Z\d_!@#$%^&*()-+=]{12,24}$/;

function Register() {
    const userRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrorMessage("");
    }, [user, password, matchPassword]);

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
            <h1>Register</h1>
            <form>
                <div className="input-box">
                    <input
                        type="text"
                        ref={userRef}
                        placeholder="Username"
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <FaUser className={user ? "hide" : "icon"} />
                    <FaCheck className={validName ? "icon" : "hide"} />
                    <FaBan className={validName || !user ? "hide" : "icon"} />
                </div>
                <div
                    className={
                        userFocus && !validName ? "instructions" : "offscreen"
                    }
                >
                    <FaInfoCircle className="icon" />
                    <p id="uidnote">
                        4 to 24 characters <br />
                        Must begin with a letter <br />
                        Letters, numbers, underscores, hyphens allowed
                    </p>
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        required
                        aria-invalid={validPassword ? "false" : "true"}
                        aria-describedby="passwordnote"
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => {
                            setPasswordFocus(true);
                        }}
                        onBlur={() => setPasswordFocus(false)}
                    />
                    <FaLock className={password ? "hide" : "icon"} />
                    <FaCheck className={validPassword ? "icon" : "hide"} />
                    <FaBan
                        className={validPassword || !password ? "hide" : "icon"}
                    />
                </div>
                <div
                    className={
                        passwordFocus && !validPassword
                            ? "instructions"
                            : "offscreen"
                    }
                >
                    <FaInfoCircle className="icon" />
                    <p id="passwordnote">
                        12 to 24 characters <br />
                        Must include at least one: a lowercase letter, an
                        uppercase letter, a number, and a special character
                        <br />
                        Allowed special characters: _!@#$%^&*()-+=
                    </p>
                </div>

                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={matchPassword}
                        required
                        aria-invalid={validPassword ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onChange={(e) => setMatchPassword(e.target.value)}
                        onFocus={() => {
                            setMatchFocus(true);
                        }}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <FaLock className={matchPassword ? "hide" : "icon"} />
                    <FaCheck
                        className={
                            validMatch && matchPassword ? "icon" : "hide"
                        }
                    />
                    <FaBan
                        className={
                            validMatch || !matchPassword ? "hide" : "icon"
                        }
                    />
                </div>
                <div
                    className={
                        matchFocus && !validMatch ? "instructions" : "offscreen"
                    }
                >
                    <FaInfoCircle className="icon" />
                    <p id="confirmnote">
                        Must match the first password input field.
                    </p>
                </div>

                <button
                    disabled={
                        !validName || !validPassword || !validMatch
                            ? true
                            : false
                    }
                >
                    Sign Up
                </button>
            </form>
        </section>
    );
}

export default Register;
