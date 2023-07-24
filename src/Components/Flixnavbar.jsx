import { Link } from 'react-router-dom'
import './Navbar.css'

const Flixnavbar = () => {

    return (

        <div className='navbar'>

            <div className='container'>

                <div className='left'>

                    <div className='logodiv'>
                        <Link to='/'><img src='src/assets/log.png' /></Link>
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