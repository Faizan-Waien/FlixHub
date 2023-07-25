import { Link } from 'react-router-dom'
import './Navbar.css'
import logo from '/src/assets/log.png'

const Flixnavbar = () => {

    return (

        <div className='navbar'>

            <div className='container'>

                <div className='left'>

                    <div className='logodiv'>
                        <Link to='/'><img src={logo} /></Link>
                    </div>

                </div>

                <div className='right'>
                    <button className='btn-flix' onClick={() => {document.getElementById('sin').style.display='flex';document.getElementById('sup').style.display='none'}}>Sign In</button>
                </div>

            </div>

        </div >

    )
}

export default Flixnavbar