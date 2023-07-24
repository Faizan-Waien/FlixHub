import { Outlet, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Flix from './Flix'
import Signin from './Signin'
import Navbar from './Components/Navbar'
import Flixnavbar from './Components/Flixnavbar'
import MovDetail from './MovDetail'
import Search from './Search'
import Movies from './Movies'
import Favorites from './Favorites'
import { SearchProvider } from './searchContext'
import { FavProvider } from './FavContext'
import Footer from './Components/Footer'
import Settings from './Settings'

const Pages = () => {

  return (
    <div>
      <Routes>

        <Route Component={() =>
          <div>
            <Flixnavbar />
            <Outlet />
          </div>
        }>
          <Route path='/' Component={Flix} />
        </Route>


        <Route element={
          <div>
            <SearchProvider>
              <FavProvider>
                <Navbar />
                <Outlet />
                <Footer />
              </FavProvider>
            </SearchProvider>
          </div>
        }>
          <Route exact path='/home' Component={Home} />
          <Route exact path='/movie/:movieId' Component={() => <MovDetail />} />
          <Route exact path='/search' Component={() => <Search />} />
          <Route exact path='/favorites' Component={() => <Favorites />} />
          <Route exact path='/movies' Component={Movies} />
          <Route exact path='/settings' Component={Settings} />
        </Route>

      </Routes>
    </div>
  )
}
export default Pages