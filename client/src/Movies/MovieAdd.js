import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom'

const MovieAdd = ({setMovieList, movieList}) => {
    const initialMovie = {
            id: '',
            title: '',
            director: '',
            metascore: '',
            stars: '',
    }
    const [movie, setMovie] = useState(initialMovie)
    const [isLoading, setIsLoading] = useState(false)
    let history = useHistory()
    const {id} = useParams()

    const inputHandler = (e) => {
        setMovie({...movie, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        const movieSetter = {
            id: Date.now(),
            title: movie.title,
            director: movie.director,
            metascore: movie.metascore,
            stars: movie.stars.split(','),
        }
        if (!movieSetter.id || !movieSetter.title || !movieSetter.director || !movieSetter.metascore || !movieSetter.stars) return 
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movieSetter)
            .then(response => {
                setMovieList([...movieList, response.data])
                setIsLoading(false)
                history.push('/')
            })
            .catch(error => {
                console.log(error)
                setIsLoading(false)
            })
    }
    return (
        <>
            <form onSubmit={submitHandler}>
                <TextField
                    label='Title'
                    variant="outlined"
                    name='title'
                    value={movie.title}
                    onChange={inputHandler}
                    type='text'
                />
                <TextField
                    label='Director'
                    variant="outlined"
                    name='director'
                    value={movie.director}
                    onChange={inputHandler}
                    type='text'
                />
                <TextField
                    label='Metascore'
                    variant="outlined"
                    name='metascore'
                    value={movie.metascore}
                    onChange={inputHandler}
                    type='text'
                />
                <TextField
                    label='Stars'
                    variant="outlined"
                    name='stars'
                    value={movie.stars}
                    onChange={inputHandler}
                    type='text'
                />
                {isLoading ? <CircularProgress /> : ''}
                <Button type='submit' >
                    Add Movie
                </Button>
            </form>
        </>
    )
}

export default MovieAdd