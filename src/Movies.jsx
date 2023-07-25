import { useEffect, useState } from "react"
import './CSS Files/Movies.css'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Chip } from "@mui/material";
import useGenre from "./useGenre";
import poster1 from '/src/assets/card.jpg'
import poster2 from '/src/assets/card2.jpg'

const list = [
    {
        id: 1,
        name: 'original_title.asc',
        title: 'Name A-Z',
    },
    {
        id: 2,
        name: 'original_title.desc',
        title: 'Name Z-A',
    },
    {
        id: 3,
        name: 'popularity.desc',
        title: 'Most Popular',
    },
    {
        id: 4,
        name: 'popularity.asc',
        title: 'less Popular',
    },
    {
        id: 5,
        name: 'release_date.desc',
        title: 'Latest Movies',
    },
    {
        id: 6,
        name: 'release_date.asc',
        title: 'Old Movies',
    },
    {
        id: 7,
        name: 'vote_average.desc',
        title: 'Top Rated',
    },
    {
        id: 8,
        name: 'vote_average.asc',
        title: 'Low Rated',
    },
]

const Movies = () => {

    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const [genre, setGenre] = useState([])
    const [selectedGenre, setSelectedGenre] = useState([])
    const [sort, setSort] = useState('popularity.desc')

    const navigate = useNavigate()

    const genreURL = useGenre(selectedGenre)

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=fd89af5dc00944018de0b1f297a4ba05&sort_by=${sort}&page=${page}&with_genres=${genreURL}`).then((response) => {
            setMovies(response.data.results)
        })
    }, [page, genreURL, sort])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=fd89af5dc00944018de0b1f297a4ba05`).then((response) => {
            setGenre(response.data.genres)
        })
    }, [])

    const Next = () => {
        if (page < 500)
            setPage(page + 1)
    }

    const Back = () => {
        if (page > 1)
            setPage(page - 1)
    }

    const Plus = (item) => {
        setSelectedGenre([...selectedGenre, item])
        setGenre(genre.filter((curr) => curr.id !== item.id))
        setPage(1)
    }

    const Minus = (item) => {
        setSelectedGenre(selectedGenre.filter((curr) => curr.id !== item.id))
        setGenre([...genre, item])
        setPage(1)
    }

    return (
        <div className="parent">
            <div className="ttl">
                <h1>Movies</h1>

                <div className="dropdown">

                    <div className="plholder">
                        <input value='Sort By ' readOnly />
                    </div>
                    {list.map((li) => {
                        return (
                            <div className="sort" key={li.id} onClick={() => setSort(li.name)}>
                                <span>{li.title}</span>
                            </div>
                        )
                    })}

                </div>

            </div>
            {/* ----------------------------------------------- */}
            <div className="chip">
                {genre.map((item, ind) => {
                    return (
                        <div key={ind}>
                            <Chip label={item.name} style={{ backgroundColor: '#501616', color: "white" }} onClick={() => Plus(item)} clickable />
                        </div>
                    )
                })}

                {selectedGenre.map((item, ind) => {
                    return (
                        <div key={ind}>
                            <Chip label={item.name} style={{ backgroundColor: 'brown', color: "white" }} onDelete={() => Minus(item)} clickable />
                        </div>
                    )
                })}

            </div>

            {/* ------------------------------------------------*/}
            <div className="main2">
                {movies.map((item, ind) => {
                    return (
                        <div className="child" key={ind}>

                            <div className="sub2" onClick={() => navigate(`/movie/${item.id}`)}>

                                <img className="poster" src={item.poster_path === null ? poster1 : `https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`} />

                                <div className="detl">
                                    <img className="backdrop" src={item.backdrop_path === null ? poster2 : `https://www.themoviedb.org/t/p/w500/${item?.backdrop_path}`} />
                                    <h5><StarIcon style={{ width: 15 }} />{item.vote_average}</h5>
                                    <h3>{item.title || item.name}</h3>
                                    <p>{item.overview.substring(0, 250)+ " ..... Read More"}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* -------------------------------------*/}
            <div className="counter">
                <button className="c-btn" onClick={() => setPage(1)}> <KeyboardDoubleArrowLeftIcon /> </button>
                <button className="c-btn" onClick={Back}> <KeyboardArrowLeftIcon /> </button>

                <button className="c-btn" onClick={() => setPage(1)}>1</button>
                <button className="c-btn" onClick={() => setPage(2)}>2</button>
                <button className="c-btn" onClick={() => setPage(3)}>3</button>

                <button className="c-btn" onClick={Next}> <KeyboardArrowRightIcon />  </button>
                <button className="c-btn" onClick={() => setPage(500)}> <KeyboardDoubleArrowRightIcon /> </button>
            </div>
        </div>
    )
}
export default Movies