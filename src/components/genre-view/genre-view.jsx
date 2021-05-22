import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import "./genre-view.scss";



export class GenreView extends React.Component {
    render() {
        const { genre, movies, onBackClick } = this.props;
        return (
            <div className="genre-view">
                <div className="genre-info">
                    <div className="genre-name">
                        <span className="name">{genre.Name}</span>
                    </div>
                    <div className="genre-description">
                        <span className="description-header">Description:</span>
                        <span className="description"> {genre.Description}</span>
                    </div>
                </div>
                <div className="genre-movies">
                    <span className="movies-intro">{genre.Name} movies: </span>
                    <div className="movies">
                        {movies.map((m) => {
                            if (m.Genre.Name === genre.Name) {
                                return (
                                    <div className="movie-div" key={m._id}>
                                        <Card className="movie-card">
                                            <Card.Img className="movie-image" variant="top" src={m.ImagePath} />
                                            <Card.Body>
                                                <Card.Title>{m.Title}</Card.Title>
                                                <Link to={`/movies/${m._id}`}>
                                                    <Button variant="outline-primary">Open</Button>
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
                <div className="back-button-div">
                    <Button variant="secondary" onClick={() => { onBackClick(null) }}>Back</Button>
                </div>
            </div>
        );
    }
}

GenreView.propTypes = {
    movie: PropTypes.shape({
        Genre: {
            Name: PropTypes.string,
            Description: PropTypes.string
        }
    })
};