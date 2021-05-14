import React from 'react';
import PropTypes from "prop-types";
import './movie-view.scss';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {

	componentDidMount() {
		document.addEventListener('keypress', event => {
			console.log(event.key);
		});
	}

	render() {
		const { movie, onBackClick } = this.props;

		return (
			<div className="movie-view">
				<div>
					<img className="movie-poster" src={movie.ImagePath} />
				</div>
				<div>
					<span className="movie-title">{movie.Title}</span>
				</div>
				<div className="movie-description">
					<span className="label">Description: </span>
					<span className="value">{movie.Description}</span>
				</div>
				<div className='movie-genre'>
					<span className='label'>Genre: </span>
					<span className='value'>{movie.Genre.Name}</span>
				</div>
				<div className="movie-director">
					<span className="label">Director: </span>
					<span className="value">{movie.Director.Name}</span>
				</div>
				<Button className="back-button" onClick={() => { onBackClick(null); }} variant="link" >Back</Button>
			</div>
		);
	}
}

MovieView.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		ImagePath: PropTypes.string.isRequired,
		Genre: PropTypes.shape({
			Name: PropTypes.string.isRequired
		}),
		Director: PropTypes.shape({
			Name: PropTypes.string.isRequired
		})
	}).isRequired,
	onBackClick: PropTypes.func.isRequired
};