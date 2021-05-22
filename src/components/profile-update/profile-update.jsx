import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import './profile-update.scss';

export function ProfileUpdate(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const [usernameError, setUsernameError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [emailError, setEmailError] = useState({});


    const handleUpdate = (e) => {
        e.preventDefault();

        const isValid = formValidation();

        const url =
            "https://timsmyflix.herokuapp.com/users/" +
            localStorage.getItem("user");

        if (isValid) {
            axios
                .put(
                    url,
                    {
                        Username: username,
                        Password: password,
                        Email: email,
                        Birthday: birthday,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }
                )
                .then((response) => {
                    const data = response.data;
                    localStorage.setItem("user", data.Username);
                    localStorage.setItem('email', data.Email);
                    localStorage.setItem('birthday', data.Birthday);
                    alert("Your profile was updated successfully");
                    window.open("/", "_self");
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    const formValidation = () => {
        const usernameError = {};
        const passwordError = {};
        const emailError = {};
        let isValid = true;

        if (username.trim().length < 5) {
            usernameError.usernameShort = "Username must be at least 5 characters";
            isValid = false;
        }

        if (password.trim().length < 1) {
            passwordError.passwordMissing = "You must enter a password";
            isValid = false;
        }

        if (!email.includes(".") && !email.includes("@")) {
            emailError.emailNotEmail = "A valid email address is required";
            isValid = false;
        }

        setUsernameError(usernameError);
        setPasswordError(passwordError);
        setEmailError(emailError);
        return isValid;
    };

    return (
        <div className="update-div">
            <h1 className="update-intro">Update your information</h1>
            <Form className="register-form">
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        placeholder="Enter username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {Object.keys(usernameError).map((key) => {
                        return (
                            <div key={key} style={{ color: "red" }}>
                                {usernameError[key]}
                            </div>
                        );
                    })}
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {Object.keys(passwordError).map((key) => {
                        return (
                            <div key={key} style={{ color: "red" }}>
                                {passwordError[key]}
                            </div>
                        );
                    })}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date of Birth:</Form.Label>
                    <Form.Control
                        placeholder="MM/DD/YYYY"
                        type="text"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        placeholder="name@example.com"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {Object.keys(emailError).map((key) => {
                        return (
                            <div key={key} style={{ color: "red" }}>
                                {emailError[key]}
                            </div>
                        );
                    })}
                </Form.Group>
                <Link to={`/users/`}>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={handleUpdate}
                    >
                        Update
          </Button>
                </Link>
            </Form>
        </div>
    );
}