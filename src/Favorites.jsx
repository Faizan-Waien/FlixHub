import { useContext } from "react"
import { FavContext } from "./FavContext"
import './CSS Files/Movies.css'
import StarIcon from '@mui/icons-material/Star';

const Favorites = () => {

  const { fav, navigate, DelFav, ClearWL } = useContext(FavContext)

  return (
    <div className="parent">

      <div className="ttl">
        <h1>WATCH LIST</h1>
        <button className="bt" onClick={ClearWL}>Clear</button>
      </div>

      <div className="main2">

        {fav.length === 0 && <h1>Add movies to watch later.</h1>}

        {fav.map((items, ind) => {
          return (
            <div className="child" key={ind} >

              <div className="sub2" onClick={() => navigate(`movie/${items.id}`)}>

                <img className="poster" src={items.poster_path === null ? '/src/assets/card.jpg' : `https://www.themoviedb.org/t/p/w220_and_h330_face/${items.poster_path}`} />

                <div className="detl">
                  <img className="backdrop" src={items.backdrop_path === null ? '/src/assets/card2.jpg' : `https://www.themoviedb.org/t/p/w500/${items?.backdrop_path}`} />
                  <h5><StarIcon style={{ width: 15 }} />{items.vote_average}</h5>
                  <h3>{items.title || items.name}</h3>
                  <p>{items.overview}</p>
                </div>

              </div>
              <button onClick={() => DelFav(items)}>REMOVE</button>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Favorites