import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const MovieDetails = () => {
    const { movieId } = useParams()
    const [details, setDetails] = useState(null)

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '29db2a1e57msh50f452041cbbe3dp165fb3jsna70e2110eff7',
                'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
            }
        };

        fetch(`https://imdb-top-100-movies.p.rapidapi.com/${movieId}`, options)
            .then(response => response.json())
            .then(response => setDetails(response))
            .catch(err => console.error(err));
    }, [])

    if(details) {
        return (
            <div>
                <img src={details.image} />
                <h3>{details.title}</h3>
                <h2>{details.year}</h2>
                <p>{details.description}</p>

            </div>
        )
    } else {
        return <div>Loading...</div>
    }
    
}

export default MovieDetails