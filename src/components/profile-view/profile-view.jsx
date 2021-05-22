import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import './profile-view.scss';

export class ProfileView extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            birthday: "",
            favoriteMovies: [],
            movies: ""
        }
    }

    componentDidMount() {
        this.getUser();
    }

    getUser() {
        this.setState({
            username: localStorage.getItem("user"),
            email: localStorage.getItem("email"),
            birthday: localStorage.getItem('birthday'),
            favoriteMovies: JSON.parse(localStorage.getItem('favoriteMovies')),
        });
    }

    removeFavorite(movie) {
        let token = localStorage.getItem("token");
        let url =
            "https://timsmyflix.herokuapp.com/users/" +
            localStorage.getItem("user") + "/movies/" +
            movie._id;
        axios
            .delete(url, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log(response);
                let favMovies = response.data.FavoriteMovies;
                localStorage.setItem('favoriteMovies', JSON.stringify(favMovies));
                this.componentDidMount();
            });
    }

    handleDelete() {
        let token = localStorage.getItem("token");
        let user = localStorage.getItem("user");
        axios
            .delete(
                `https://timsmyflix.herokuapp.com/users/${user}`, { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(() => {
                alert(user + " has been deleted");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.location.pathname = "/";
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { movies, onBackClick } = this.props;
        const favoriteMovieList = movies.filter((movie) => {
            return this.state.favoriteMovies.includes(movie._id);
        });
        return (
            <div>
                <div className="user-info">
                    <h1 className="user-info-header">Your Information</h1>
                    <Form>
                        <Form.Group controlId="formBasicUsername">
                            <h5>Username: </h5>
                            <Form.Label> {this.state.username}</Form.Label>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <h5>Email:</h5>
                            <Form.Label >{this.state.email}</Form.Label>
                        </Form.Group>
                        <Form.Group controlId="formBasicDate">
                            <h5>Date of Birth:</h5>
                            <Form.Label>{this.state.birthday}</Form.Label>
                        </Form.Group>
                        <div className="update-and-delete">
                            <Link to={`/update/${this.state.username}`}>
                                <Button variant="link" className="edit-info">Edit information</Button>
                            </Link>
                            <div>
                                <h6 className="delete-profile">YOU ONLY GET ONE CLICK, ARE YOU SURE?</h6>
                                <Button className="delete-profile-button" variant="outline-danger" onClick={() => { this.handleDelete() }}>Delete Profile</Button>
                            </div>
                        </div>
                    </Form>
                </div>
                <div className="favorite-movies">
                    <h1 className="movies-intro">Favorite Movies</h1>
                    <div className="movies">
                        {favoriteMovieList.map((movie) => {
                            return (
                                <div className="movie-div" key={movie._id}>
                                    <Card className="movie-card">
                                        <Card.Img variant="top" src={movie.ImagePath} />
                                        <Card.Body>
                                            <Card.Title>{movie.Title}</Card.Title>
                                            <div>
                                                <Link to={`/movies/${movie._id}`}>
                                                    <Button className="see-more-button" variant="link">See more details</Button>
                                                </Link>
                                            </div>
                                            <Button className="remove-button" variant="link" onClick={() => this.removeFavorite(movie)}>Remove from favorites</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

ProfileView.propTypes = {
    movies: PropTypes.array.isRequired,
};