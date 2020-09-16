import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom'

const MovieUpdate = ({setMovieList, movieList}) => {
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

    useEffect(()=> {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovie(res.data)
            })
            .catch(err => console.log(err))
    }, [id])

    const inputHandler = (e) => {
        setMovie({...movie, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        //don't forget to check form validation
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(response => {
                setMovieList(movieList.map(mv => {
                    if (mv.id == id) {
                        return response.data
                    } else {
                        return mv
                    }
                }))
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
                {isLoading ? <CircularProgress /> : ''}
                <Button type='submit' >
                    Update
                </Button>
            </form>
        </>
    )
}

export default MovieUpdate