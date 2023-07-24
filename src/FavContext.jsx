import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const FavContext = createContext()

const value = () => {

  const navigate = useNavigate()

  const { movieId } = useParams()

  const storage = localStorage.getItem('Fav') ? JSON.parse(localStorage.getItem('Fav')) : []


  const [info, setInfo] = useState([])
  const [fav, setFav] = useState(storage)
  const [cast, setCast] = useState([])
  const [similar, setSimilar] = useState([])

  const Total = fav.reduce((quantity, curVal) => quantity + curVal.quantity, 0)

  useEffect(() => {
    if (movieId) {
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=fd89af5dc00944018de0b1f297a4ba05`).then((response) => {
        setInfo(response.data)
      })
    }
  }, [movieId])

  useEffect(() => {

    if (movieId) {
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=fd89af5dc00944018de0b1f297a4ba05`).then((response) => {
        setCast(response.data.cast)
      })
    }
  }, [movieId])

  useEffect(() => {
    if (movieId) {
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=fd89af5dc00944018de0b1f297a4ba05`).then((response) => {
        setSimilar(response.data.results)
      })
    }
  }, [movieId])

  useEffect(()=>{
    localStorage.setItem('Fav', JSON.stringify(fav))
  },[fav])

  const AddFav = (info) => {
    const ProductExist = fav.find((item) => item.id === info.id)
    if (ProductExist) {
      setFav(
        fav.map((item) => item.id === info.id
          ? { ...ProductExist }
          : item
        ))
    } 
    else {
      setFav([...fav, { ...info, quantity: 1 }])
    }
  }

  const DelFav = (info) => {
    // const ProductExist = fav.find((item) => item.id === info.id)
    // if (ProductExist) {
    setFav(
      fav.filter((item) => item.id !== info.id)
    )
  }
  // }

  const ClearWL = () => {
    setFav([])
  }

  return { fav, setFav, AddFav, navigate, DelFav, info, setInfo, movieId, Total, ClearWL, cast, setCast, similar, setSimilar }
}

export const FavProvider = ({ children }) => {
  return (
    <FavContext.Provider value={value()}>{children}</FavContext.Provider>
  )
}
