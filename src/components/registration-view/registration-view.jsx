import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        /* Send a request to the server*/
        props.onRegistered(username);
    };

    return (
        <Form>
            <Form.Group>
                <Form.Label className="username">Username:</Form.Label>
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
            </Form.Group>
            <Form.Group>
                <Form.Label className="password">Password:</Form.Label>
                <Form.Control type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
            </Form.Group>
            <Form.Group>
                <Form.Label className="email">Email:</Form.Label>
                <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" />
                <Form.Text className="text-muted">We will never share your email with anyone else</Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label className="birthday">Birthday:</Form.Label>
                <Form.Control type="text" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="MM/DD/YYYY" />
            </Form.Group>
            <Button type="submit" onClick={handleSubmit} className="register-button">Register</Button>
            <Button type="submit" onClick={props.onExistingUser} className="existing-button">Existing User</Button>
        </Form>
    );
}

RegistrationView.propTypes = {
    onRegistered: PropTypes.func.isRequired
};