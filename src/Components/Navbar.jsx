import SearchIcon from '@mui/icons-material/Search';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './Navbar.css'
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSearch } from '../searchContext';
import { Badge } from '@mui/material';
import { FavContext } from '../FavContext';
import Switch from '@mui/material/Switch';

const Navbar = () => {

    const { content, setContent, navigate, searchText, setSearchText } = useSearch()

    const { Total } = useContext(FavContext)

    const [focus, setFocus] = useState(false)
    const [focus2, setFocus2] = useState(false)

    const fetchSearch = () => {
        axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=fd89af5dc00944018de0b1f297a4ba05&query=${searchText}`
        ).then((response) => {
            setContent(response.data.results)
        })
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            fetchSearch()
        }, 800)
        return () => clearTimeout(timer)
    }, [searchText])

    // useEffect(() => {
    //     let timer
    //     if (searchText) {
    //         timer = setTimeout(() => {
    //             fetchSearch()
    //         }, 800)
    //     }

    //     return () => clearTimeout(timer)
    // }, [searchText])

    const [isScrolled, setIsScrolled] = useState(false)

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.scroll = null)
    }
    // -------------------------------------
    const [theme, setTheme] = useState('darkTheme')

    const ToggleMode = () => {
        theme === 'darkTheme' ? setTheme('lightTheme') : setTheme('darkTheme')
    }

    useEffect(() => {
        document.body.className = theme
    }, [theme])
    // ----------------------------------------------
    return (
        <>
            <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>

                <div className='container'>

                    <div className='left'>
                        <div className='logodiv'>
                            <Link to='/home'><img src='/src/assets/log.png' /></Link>
                        </div>
                    </div>

                    <div className='right'>

                        <div className='ser'>
                            <form className='frm' onSubmit={(e) => e.preventDefault()}>
                                <input id='in' type='text' placeholder='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setTimeout(() => setFocus(false), 300)} />

                                <button className='btn-nav' type='submit' onClick={() => content?.length > 0 && navigate(`/search`)} > <SearchIcon /></button>
                            </form>
                            {/* --------------------------------------              */}

                            {focus && content && <div className={content.length === 0 ? 'trans' : 'map'}>

                                {content.slice(0, 5).map((items, ind) => {
                                    return (

                                        <div className='dd' key={ind} onClick={() => navigate(`movie/${items.id}`)}>
                                            <div className='d2'>
                                                <img src={items.poster_path === null ? '/src/assets/card.jpg' : `https://www.themoviedb.org/t/p/w220_and_h330_face/${items?.poster_path}`} />

                                                <span>{items?.title || items?.name}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>}

                            {/* --------------------------------------            */}

                        </div>

                        <Link to='/Favorites'><Badge color='success' overlap="circular" badgeContent={Total}><AddToQueueIcon className='watchBtn' /></Badge></Link>

                        <div className='profile' onClick={() => setFocus2(!focus2)}>
                            <img src='/src/assets/OIP.jpg' />
                            <KeyboardArrowDownIcon style={{ color: 'white', cursor: 'pointer' }} />
                        </div>

                        {focus2 &&
                            <div className='options'>

                                <div className='switch'>
                                    <span style={{fontWeight:'bold'}}>Mode</span>
                                    <Switch onChange={ToggleMode} defaultChecked />
                                </div>

                                <span className='txt' onClick={() => navigate('/settings')}>Settings</span>
                                <span className='txt' onClick={() => navigate('/')}>Sign Out</span>

                            </div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar