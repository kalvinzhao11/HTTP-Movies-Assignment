import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import MovieCard from "./Movies/MovieCard";
import MovieUpdate from './Movies/MovieUpdate'
import MovieAdd from './Movies/MovieAdd'

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  console.log(movieList)
  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);
  return (
    <>
      <SavedList list={savedList} />
      <Link to="/add-movie">Add Movie</Link>

      <Route exact path="/">
        <MovieList movies={movieList} setMovieList={setMovieList} movieList={movieList}/>
      </Route>

      <Route path="/movies/:id">
        <Movie setMovieList={setMovieList} movieList={movieList} />
      </Route>

      <Route path={`/update-movie/:id`} >
        <MovieUpdate addToSavedList={addToSavedList} setMovieList={setMovieList} movieList={movieList}/>
      </Route>

      <Route path="/add-movie">
        <MovieAdd setMovieList={setMovieList} movieList={movieList}/>
      </Route>
    </>
  );
};

export default App;
