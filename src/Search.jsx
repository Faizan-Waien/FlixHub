import { useSearch } from "./searchContext"
import './CSS Files/Movies.css'
import StarIcon from '@mui/icons-material/Star';
import poster1 from '/src/assets/card.jpg'
import poster2 from '/src/assets/card2.jpg'

const Search = () => {
    const { content, setContent, navigate, searchText } = useSearch()

    if (content) {
        return (
            <div className="parent">
                <div className="ttl">
                    <h1>Search results for {searchText}</h1>
                </div>

                <div className="main2">

                    {content.map((items, ind) => (
                        <div className="child" key={ind}>

                            <div className="sub2" onClick={() => navigate(`movie/${items.id}`)}>

                                <img className="poster" src={items.poster_path === null ? poster1 : `https://www.themoviedb.org/t/p/w220_and_h330_face/${items.poster_path}`} />

                                <div className="detl">
                                    <img className="backdrop" src={items.backdrop_path === null ? poster2 : `https://www.themoviedb.org/t/p/w500/${items?.backdrop_path}`} />
                                    <h5><StarIcon style={{ width: 15 }} />{items.vote_average}</h5>
                                    <h3>{items.title || items.name}</h3>
                                    <p>{items.overview}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Search