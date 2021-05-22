import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./registration-view.scss";
export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const [usernameError, setUsernameError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [emailError, setEmailError] = useState({});


    const handleRegister = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        const isValid = formValidation();
        if (isValid) {
            axios.post('https://timsmyflix.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            }).then(response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self');
            }).catch(e => {
                console.log('error registering the user')
            });
        }
    }

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
        <div className="container">
            <h1 className="welcome">Welcome to My Flix!</h1>
            <Form className="register-form">
                <Form.Group controlId="registerUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control placeholder="Enter username" type="text" onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                {Object.keys(usernameError).map((key) => {
                    return (
                        <div key={key} style={{ color: "red" }}>
                            {usernameError[key]}
                        </div>
                    );
                })}

                <Form.Group controlId="registerPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control placeholder="Enter password" type="password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                {Object.keys(passwordError).map((key) => {
                    return (
                        <div key={key} style={{ color: "red" }}>
                            {usernameError[key]}
                        </div>
                    );
                })}

                <Form.Group controlId="registerEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control placeholder="sample@email.com" type="text" onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                {Object.keys(emailError).map((key) => {
                    return (
                        <div key={key} style={{ color: "red" }}>
                            {emailError[key]}
                        </div>
                    );
                })}

                <Form.Group controlId="registerBirthday">
                    <Form.Label>Birthdate:</Form.Label>
                    <Form.Control placeholder="MM/DD/YYYY" type="text" onChange={e => setBirthday(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleRegister}>Create Account</Button>
            </Form>
            <div className="existing-user">
                <h6 className="exisiting">Already have an account?</h6>
                <Link to={"/"}>
                    <h6 className="sign-in">Sign in here</h6>
                </Link>
            </div>
        </div>
    );
}
