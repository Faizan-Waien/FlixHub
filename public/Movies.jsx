import './Movies.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Movies = () => {
    const navigate = useNavigate()
    const [mData, setMData] = useState([])

    useEffect(() => {

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '29db2a1e57msh50f452041cbbe3dp165fb3jsna70e2110eff7',
                'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
            }
        };

        fetch('https://imdb-top-100-movies.p.rapidapi.com/', options)
            .then(response => response.json())
            .then(response => setMData(response))
            .catch(err => console.error(err));


    }, [])

    return (
        <div className='movcon'>
            {
                mData.map(item => {

                    return (

                        <div className='cont' key={item.imdbid} onClick={() => navigate(`/movie/${item.id}`)}>
                                <img src={item.image} />
                                <h3>{item.title}</h3>
                                <span>Rating: {item.rating}</span>
                                <span>Year: {item.year}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Movies
