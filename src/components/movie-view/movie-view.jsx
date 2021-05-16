import React from 'react';
import Proptypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

import "./movie-view.scss";

export class MovieView extends React.Component {
	constructor() {
		super();

		this.state = {
			favoriteMovies: [],
			inFavorites: true
		};
	}

	componentDidMount() {
		this.getMovies();
	}

	getMovies() {
		this.setState({
			favoriteMovies: localStorage.getItem("favoriteMovies")
		})
	}


	removeFavorite(movie) {
		this.setState({ inFavorites: !this.state.inFavorites });
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
				localStorage.setItem('favoriteMovies', favMovies);
				this.componentDidMount();
			});
	}

	addFavorite(movie) {
		this.setState({ inFavorites: !this.state.inFavorites });
		let token = localStorage.getItem("token");
		let url =
			"https://timsmyflix.herokuapp.com/users/" +
			localStorage.getItem("user") +
			"/movies/" +
			movie._id;

		console.log(token);

		axios
			.post(url, "", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				console.log(response);
				alert("Added to favorites!");
			});
	}

	render() {
		const { movie, onBackClick } = this.props;
		const buttonVisible = this.state.inFavorites ? (<Button variant="primary" size="sm" onClick={() => { this.addFavorite(movie) }}>Add to Favorites</Button>) : (<Button variant="primary" size="sm" onClick={() => { this.removeFavorite(movie) }}>Remove from Favorites</Button>)
		return (
			<div className="movie-view">
				<div className="movie-image">
					<img src={movie.ImagePath} />
				</div>
				<div className="movie-title">
					<span className="label">Title: </span>
					<span className="value">{movie.Title}</span>
				</div>
				<div className="movie-description">
					<span className="label">Description: </span>
					<span className="value">{movie.Description}</span>
				</div>
				<div className="movie-director">
					<span>Director: </span>
					<Link to={`/directors/${movie.Director.Name}`}>
						<Button variant="link">{movie.Director.Name}</Button>
					</Link>
				</div>
				<div className="movie-genre">
					<span className="label">Genre: </span>
					<Link to={`/genres/${movie.Genre.Name}`}>
						<Button variant="link">{movie.Genre.Name}</Button>
					</Link>
				</div>
				{buttonVisible}
				<Button variant="secondary" onClick={() => { onBackClick() }}>Back</Button>
			</div>
		);
	}
}

MovieView.Proptypes = {
	movie: Proptypes.shape({
		Title: Proptypes.string.isRequired,
		Description: Proptypes.string.isRequired,
		ImagePath: Proptypes.string.isRequired
	}).isRequired,
	onBackClick: Proptypes.func.isRequired
};
