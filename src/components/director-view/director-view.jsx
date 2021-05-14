import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export class DirectorView extends React.Component {
    render() {
        const { director, movies, onBackClick } = this.props;
        return (
            <div className="director-view">
                <div className="director-name">
                    <span className="label">Name: </span>
                    <span className="value">{director.Name}</span>
                </div>
                <div className="director-bio">
                    <span className="label">Bio: </span>
                    <span className="value">{director.Bio}</span>
                </div>
                <div className="director-birth">
                    <span className="label">Birth: </span>
                    <span className="value">{director.Birth}</span>
                </div>
                <div className="director-death">
                    <span className="label">Death: </span>
                    <span className="value">{director.Death}</span>
                </div>
                <div className="director-movies">
                    <span className="label">Movies directed by {director.Name}: </span>
                    <div>
                        {movies.map((m) => {
                            if (m.Director.Name === director.Name) {
                                return (
                                    <div key={m._id}>
                                        <Card>
                                            <Card.Img variant="top" src={m.ImagePath} />
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
                <Button variant="secondary" onClick={() => { onBackClick(null) }}>Back</Button>
            </div>
        );
    }
}