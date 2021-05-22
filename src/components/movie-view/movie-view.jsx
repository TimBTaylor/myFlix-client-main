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
			inFavorites: null
		};
	}

	isFavorite() {
		const favMovies = JSON.parse(localStorage.getItem('favoriteMovies'));
		const movieID = this.props.movie._id;
		const inFavMovies = favMovies.includes(movieID);
		if (inFavMovies) {
			this.setState({ inFavorites: true })
		}

	}

	componentDidMount() {
		this.getMovies();
		this.isFavorite();
	}

	getMovies() {
		this.setState({
			favoriteMovies: JSON.parse(localStorage.getItem("favoriteMovies"))
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
				localStorage.setItem('favoriteMovies', JSON.stringify(response.data.FavoriteMovies));
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
				const favMovies = response.data.FavoriteMovies;
				localStorage.setItem('favoriteMovies', JSON.stringify(favMovies));
			});
	}

	render() {
		const { movie, onBackClick } = this.props;
		const buttonVisible = this.state.inFavorites ? (<Button className="favorite-button" variant="primary" size="sm" onClick={() => { this.removeFavorite(movie) }}>Remove from Favorites</Button>) : (<Button className="favorite-button" variant="primary" size="sm" onClick={() => { this.addFavorite(movie) }}>Add to Favorites</Button>);
		return (
			<div className="movie-view">
				<div className="movie-image">
					<img src={movie.ImagePath} />
				</div>
				<div className="movie-title">
					<span className="movie-title">{movie.Title}</span>
				</div>
				<div className="movie-description">
					<span className="description-header">Description:</span>
					<span className="description"> {movie.Description}</span>
				</div>
				<div className="movie-director">
					<span className="director-header">Director: </span>
					<Link to={`/directors/${movie.Director.Name}`}>
						<h6 className="director-link"> {movie.Director.Name}</h6>
					</Link>
				</div>
				<div className="movie-genre">
					<span className="genre-header">Genre:</span>
					<Link to={`/genres/${movie.Genre.Name}`}>
						<h6 className="genre-link">{movie.Genre.Name}</h6>
					</Link>
				</div>
				<div className="buttons">
					{buttonVisible}
					<Button className="back-button" variant="secondary" onClick={() => { onBackClick() }}>Back</Button>
				</div>
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
