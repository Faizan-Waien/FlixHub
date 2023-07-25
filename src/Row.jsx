import { useEffect, useState } from "react"
import axios from "axios"
import './CSS Files/Row.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useNavigate } from "react-router-dom"
import poster1 from '/src/assets/card.jpg'
import poster2 from '/src/assets/card2.jpg'

const Row = ({ title, fetchURL, rowID }) => {

    const navigate = useNavigate()

    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get(fetchURL).then((response) => {
            setMovies(response.data.results)
        })

    }, [fetchURL])

    const slideLeft = () => {
        var slide = document.getElementById('slider' + rowID)
        slide.scrollLeft = slide.scrollLeft - 500
    }

    const slideRight = () => {
        var slide = document.getElementById('slider' + rowID)
        slide.scrollLeft = slide.scrollLeft + 500
    }

    return (
        <div>
            <h2 className="title">{title}</h2>

            <button className="slBtn" onClick={slideLeft}><ArrowBackIosIcon /></button>
            <button className="slBtn" onClick={slideRight} style={{ right: 0 }}><ArrowForwardIosIcon /></button>

            <div className='main' id={'slider' + rowID}>

                {movies.map((items,ind) => {
                    return (
                        <div className="sub" key={ind} onClick={() => navigate(`/movie/${items.id}`)} >
                            <img className="poster_img" src={items.poster_path === null ? poster1 : `https://www.themoviedb.org/t/p/w220_and_h330_face/${items.poster_path}`} />
                            <img className="backdrop_img" src={items.backdrop_path === null ? poster2 : `https://www.themoviedb.org/t/p/w500/${items.backdrop_path}`} />

                            <div className="details">
                                <h5>{items.vote_average}</h5>
                                <h3>{items.title}</h3>
                                {/* <p>{items.overview}</p> */}
                                <p>{items.overview.substring(0, 250)+ " ..... Read More"}</p>

                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}
export default Row