const posterPath = `https://www.themoviedb.org/t/p/w220_and_h330_face/`
const backdropPath = `https://www.themoviedb.org/t/p/w500/`

const key = 'fd89af5dc00944018de0b1f297a4ba05'

export const requests = { 
  popular:   `https://api.themoviedb.org/3/movie/popular?api_key=${key}`,
  topRated:  `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}`,
  upComming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`,
  detail:    `https://api.themoviedb.org/3/movie/{movie_id}?api_key=${key}`,
  search:    `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=`,
}

// export let url= baseUrl+'search/movie?'+APIkey+search
let baseUrl='https://api.themoviedb.org/3'
let APIkey='api_key=fd89af5dc00944018de0b1f297a4ba05'
// const url= baseUrl+'/search/movie?'+APIkey+'&query='

