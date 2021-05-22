import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://timsmyflix.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no such user')
            });
    };

    return (
        <div className="container">
            <div className="title">
                <h1 className="my-flix">My Flix</h1>
            </div>
            <div className="welcome">
                <h1 className="welcome-back">Welcome back!</h1>
            </div>
            <Form className="sign-in-form">
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button className="login-button" variant="primary" type="submit" onClick={handleSubmit}>Log in</Button>
            </Form>
            <div className="register">
                <h6 className="register-question">Don't have an account?</h6>
                <Link to={"/register"}>
                    <h6 className="register-link">Register here</h6>
                </Link>
            </div>
        </div>
    )
}