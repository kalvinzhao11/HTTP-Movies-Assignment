import React from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import MovieUpdate from './MovieUpdate';

const MovieCard = props => {
  const { title, director, metascore, stars, id } = props.movie;
  const history = useHistory()
  const deleteHandler = (e) => {
    e.preventDefault()
    Axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        props.setMovieList(props.movieList.filter(movie => {
          return movie.id != id
        }))
        history.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }
  const updateHandler = (e) => {
    e.preventDefault()
    history.push(`/update-movie/${id}`)
  }
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <button onClick={updateHandler}>
        Update
      </button>
      <button onClick={deleteHandler}>
        Delete
      </button>
    </div>
  );
};

export default MovieCard;
