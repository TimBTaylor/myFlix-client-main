import React from 'react';
import Proptypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import "./movie-card.scss";

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;
        return (
            <Card>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant="outline-primary">Open</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.proptypes = {
    movie: Proptypes.shape({
        Title: Proptypes.string
    }).isRequired
};