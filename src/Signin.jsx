import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CSS Files/Signin.css'

const Signin = ({ users }) => {

    const [error, setError] = useState()

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const hanleInputs = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser({ ...user, [name]: value })
    }

    const Submit = (e) => {
        e.preventDefault()
        setUser({
            email: '',
            password: '',
        })
    }

    const Nav = () => {
        if (user.email !== "" && user.password !== '') {
            if (user.email === users?.email && user.password === users?.password) {
                navigate('/home')
            } else {
                setError('Incorrect Information')
                setTimeout(() => {
                    setError('')
                }, 1000);
            }
        }
    }

    const navigate = useNavigate()

    return (

        <div className='form'>
            <h1>Sign In</h1>

            <form className='log' onSubmit={Submit}>

                <input type='text' placeholder='Email address ' value={user.email} name='email' id='email' onChange={hanleInputs} required />
                <input type='password' placeholder='Password' value={user.password} name='password' id='password' onChange={hanleInputs} required />
                {error && <span>{error}</span>}
                <button type='submit' onClick={Nav}>Sign In</button>

                <div className='sup'>
                    <span>New to Netflix? </span><span style={{ cursor: "pointer", color: 'white' }} onClick={() => { document.getElementById('sin').style.display = 'none'; document.getElementById('sup').style.display = 'block' }} >Sign up now.</span>
                </div>

            </form>

            <button className='glog' onClick={() => navigate('/home')}>Guest Login</button>

        </div>
    )
}
export default Signin