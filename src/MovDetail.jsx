import axios from "axios"
import './CSS Files/MovDetail.css'
import { useEffect, useState } from "react"
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FavContext } from "./FavContext";
import { useContext } from "react";
import poster1 from '/src/assets/card.jpg'
import poster2 from '/src/assets/card2.jpg'
import profilepic from '/src/assets/OIP.jpg'

function MovDetail() {

  const { AddFav, fav, navigate, DelFav, info, movieId, cast, similar } = useContext(FavContext)

  const isFav = fav.find((item) => item.id === info.id)

  const [detail, setDetail] = useState(null)
  const [source, setSource] = useState(null)
  const [like, setLike] = useState(false)
  const [add, setAdd] = useState(Boolean(isFav))

  const selectedSource = detail?.results?.find((item, idx) => idx === source)

  useEffect(() => {
    setAdd(Boolean(isFav))
  }, [isFav])

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=fd89af5dc00944018de0b1f297a4ba05`).then((response) => {
      setDetail(response.data)
    })
  }, [movieId])

  const Click = () => {
    setLike(!like)
  }

  const Click2 = () => {
    if (add) {
      DelFav(info);
    } else {
      AddFav(info);
    }
    // setAdd(!add)
  }

  const Left = () => {
    var slide = document.getElementById('slider')
    slide.scrollLeft = slide.scrollLeft - 500
  }

  const Right = () => {
    var slide = document.getElementById('slider')
    slide.scrollLeft = slide.scrollLeft + 500
  }

  if (detail && info) {
    return (
      <div className="parent">

        <h1>{info.title}</h1>

        <h3 style={{ marginLeft: 60 }}>{selectedSource?.name || ""}</h3>

        <div className="vid">
          {
            selectedSource?.key ?
              <iframe width="100%" height="500px" src={`https://www.youtube.com/embed/${selectedSource?.key}`}
                frameborder='0'
                allow='autoplay; encrypted-media'
                allowfullscreen
                title='video' /> :
              <img width="100%" height="500px" src={`https://www.themoviedb.org/t/p/w500/${info.backdrop_path}`} />
          }
        </div>

        <div className="ch">
          <h3>Select which one you like to watch</h3>

          <div className="btn">
            {detail?.results?.map((item, idx) => {
              return (
                <div key={idx} onClick={() => setSource(idx)}>
                  <button>{item.name}</button>
                </div>
              )
            }) || null}
          </div>
        </div>

        <div className="info">

          <div className="info1">

            <div className="imge"> <img src={info.poster_path === null ? poster1 : `https://www.themoviedb.org/t/p/w220_and_h330_face/${info.poster_path}`} /> </div>

            <div className="det">

              <h2 style={{ margin: 0 }}>{info.title}</h2>
              <p style={{ marginTop: 0, color: "grey" }}>{info.tagline}</p>

              <div className="movInfo">

                <span>HD</span>

                <span><StarIcon style={{ color: 'goldenrod' }} />{Math.round(info.vote_average * 10) / 10}</span>

                <span>{info.runtime} min</span>

                <AddToQueueIcon className="watchBtn" onClick={Click2} style={add ? { color: 'green' } : {}} />

                <div style={{ alignItems: 'center', display: "flex", gap: 5, cursor: "pointer", margin: 5 }}>
                  <ThumbUpIcon onClick={Click} style={like ? { color: "white" } : { color: "green" }} />

                  <ThumbDownIcon onClick={Click} style={!like ? { color: "white" } : { color: 'red' }} />
                </div>

              </div>

              <br />

              <div>
                {info?.genres?.map((data, idx) => {
                  return (
                    <span key={idx} style={{ display: "inline-flex", background: '#312d2d', color: "white", border: '1px solid gray', padding: '5px', margin: '5px' }}>{data.name}</span>
                  )
                }) || null}
              </div><br />

              <div style={{ display: "flex", gap: 20 }}>
                <div><span><b>Release Date:</b></span></div>
                <div><span>{info.release_date}</span></div>
              </div><br />

              <div style={{ display: "flex", gap: 30 }}>

                <div><span><b>Production:</b></span></div>

                <div>{info?.production_companies?.map((data, idx) => {
                  return (
                    <span key={idx}> {data.name}, </span>
                  )
                }) || null}
                </div>
              </div><br />

              <div style={{ display: "flex", gap: 40 }}>

                <div><span><b>Countries:</b></span></div>

                <div>{info?.production_countries?.map((data, idx) => {
                  return (
                    <span key={idx}> {data.name}, </span>
                  )
                }) || null}

                </div>
              </div>

              <p>{info.overview}</p>

            </div>
          </div>

          {/* ----------------------------------------------------- */}

          <div className="simi">

            <h2>You May Also Like</h2>

            <div className="ss">
              {similar.slice(0, 4).map((s, ind) => {
                return (
                  <div className="child" style={{ margin: '10px 5px' }} key={ind}>

                    <div className="sub2" onClick={() => navigate(`/movie/${s.id}`)}>

                      <img className="poster" style={{ width: 220 }} src={s.poster_path === null ? poster1 : `https://www.themoviedb.org/t/p/w220_and_h330_face/${s.poster_path}`} />

                      <div className="detl">
                        <img className="backdrop" style={{ width: 220 }} src={s.backdrop_path === null ? poster2 : `https://www.themoviedb.org/t/p/w500/${s?.backdrop_path}`} />
                        <h5><StarIcon style={{ color: 'goldenrod', width: 15 }} />{Math.round(s.vote_average * 10) / 10}</h5>
                        <h3>{s.title || s.name}</h3>
                        <p>{s.overview.substring(0, 250) + " ..... Read More"}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {/* ----------------------------------------------------- */}
        <h2 style={{ paddingLeft: 55, fontWeight: 100, margin: 0 }}>Cast</h2>

        <div className="sli">

          <ArrowBackIosIcon className="sliBtn" onClick={Left} />
          <ArrowForwardIosIcon className="sliBtn" style={{ right: 0 }} onClick={Right} />

          <div className="cast" id={"slider"}>

            {cast.map((c, ind) => {
              return (
                <div className="subcast" key={ind}>
                  <div className="im">
                    <img src={c.profile_path === null ? profilepic : `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${c.profile_path}`} /></div>
                  <p>{c.name}</p>
                  <span>({c.character})</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  } else {
    return <h1>Loading...</h1>
  }
}

export default MovDetail