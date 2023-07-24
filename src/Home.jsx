import './CSS Files/Home.css';
import Row from "./Row";
import { requests } from "./API requests";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate()

    const [homeSl, setHomeSl] = useState([])

    const movie = homeSl[Math.floor(Math.random() * homeSl.length)]

    useEffect(() => {
        axios.get(requests.popular).then((response) => {
            setHomeSl(response.data.results)
        })
    }, [])

    return (
        <>
            <div className="imgDiv">

                <img src={`http://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />

                <div className="detail">

                    <h1>{movie?.title}</h1>

                    <button className="homeBtn" onClick={() => navigate(`/movie/${movie.id}`)}>Play</button>

                    <p>{movie?.overview}</p>

                </div>
            </div>

            <div className='tb'>
                <span onClick={() => navigate('/movies')} >ALL MOVIES</span>
            </div>

            <Row rowID='1' title='Popular' fetchURL={requests.popular} /> <br />
            <Row rowID='2' title='Top Rated' fetchURL={requests.topRated} /> <br />
            <Row rowID='3' title='Up-Comming' fetchURL={requests.upComming} /> <br />
        </>
    )
}
export default Home
