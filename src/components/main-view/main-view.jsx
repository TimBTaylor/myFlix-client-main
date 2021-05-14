import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

class MainView extends React.Component {

	constructor() {
		super();
		// Initial state is set to null
		this.state = {
			movies: [],
			selectedMovie: null,
			user: null,
			register: false
		};
	}

	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({
				user: localStorage.getItem('user')
			});
			this.getMovies(accessToken);
		}
	}

	/*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

	setSelectedMovie(movie) {
		this.setState({
			selectedMovie: movie
		});
	}

	/* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

	onLoggedIn(authData) {
		console.log(authData);
		this.setState({
			user: authData.user.Username
		});

		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		this.getMovies(authData.token);
	}

	getMovies(token) {
		axios.get('https://timsmyflix.herokuapp.com/movies', {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then(response => {
				// Assign the result to the state
				this.setState({
					movies: response.data
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	onLoggedOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState({
			user: null
		});
	}

	onRegistered(register) {
		this.setState({
			register
		});
	}

	onExistingUser(register) {
		this.setState({
			register: true
		});
	}

	render() {
		const { movies, selectedMovie, user, register } = this.state;

		if (!register) return <RegistrationView onRegistered={register => this.onRegistered(register)} onExistingUser={(e) => { e.preventDefault(); this.setState({ register: !this.state.register }) }} />;


		if (!user) return <LoginView />;

		// Before the movies have been loaded
		if (movies.length === 0) return <div className="main-view" />;

		return (
			<div>
				<Row className="main-view justify-content-md-center">
					{selectedMovie
						? (
							<Col md={8}>
								<MovieView key={movie._id} movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
							</Col>
						)
						: movies.map(movie => (
							<Col md={3}>
								<MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
							</Col>
						))
					}
				</Row>
				<button onClick={() => { this.onLoggedOut() }}>Logout</button>
			</div>
		);
	}

}

export default MainView;