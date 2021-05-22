import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './director-view.scss';

export class DirectorView extends React.Component {
    render() {
        const { director, movies, onBackClick } = this.props;
        return (
            <div className="director-view">
                <div className="director-info">
                    <div className="director-name">
                        <span className="name">{director.Name}</span>
                    </div>
                    <div className="director-bio">
                        <span className="bio-header">Bio:</span>
                        <span className="bio"> {director.Bio}</span>
                    </div>
                    <div className="director-birth">
                        <span className="born-header">Born:</span>
                        <span className="born-year"> {director.Birth}</span>
                    </div>
                    <div className="director-death">
                        <span className="death-header">Death:</span>
                        <span className="death-year"> {director.Death}</span>
                    </div>
                </div>
                <div className="director-movies">
                    <span className="directed-by">Movies directed by {director.Name} </span>
                    <div className="movies">
                        {movies.map((m) => {
                            if (m.Director.Name === director.Name) {
                                return (
                                    <div className="movie-div" key={m._id}>
                                        <Card className="movie-card">
                                            <Card.Img className="movie-image" variant="top" src={m.ImagePath} />
                                            <Card.Body>
                                                <Card.Title>{m.Title}</Card.Title>
                                                <Link to={`/movies/${m._id}`}>
                                                    <Button variant="link">See movie details</Button>
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
                    <Button className="go-back" variant="secondary" onClick={() => { onBackClick(null) }}>Back</Button>
                </div>
            </div>
        );
    }


}

DirectorView.propTypes = {
    Movie: PropTypes.shape({
        Director: {
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string,
            Birth: PropTypes.number,
            Death: PropTypes.number,
        }
    })
};