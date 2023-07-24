import { useRef, useState } from 'react'
import './CSS Files/Flix.css'
import Signin from './Signin'

const Flix = () => {

  // const emailRef = useRef()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [toggle, setToggle] = useState(true)

  console.log(user.email)
  console.log(user.password)

  const handleInput = (e) => {
    const name = (e.target.name)
    const value = (e.target.value)

    setUser({ ...user, [name]: value })
  }

  // const Submit = (e) => {
  //   e.preventDefault()

  //   // setUser({
  //   //   email: '',
  //   //   password: '',
  //   // })
  // }

  const Submit = (e) => {
    e.preventDefault()
    if (user.email && user.password) {

      setToggle(!toggle)
      setMessage('Verification Email have been sent to your email address. Verify and Sign In')

      setUser({
        email: '',
        password: '',
      })

      setTimeout(() => {
        setMessage('')
      }, 2000);

    } else {
      setMessage('Create Password')

      setTimeout(() => {
        setMessage('')
      }, 1000);
    }
  }

  const ToggleBtn = () => {
    if (user.email) {
      setToggle(!toggle)
    } else {
      setMessage('Enter your Email Address')

      setTimeout(() => {
        setMessage('')
      }, 1000);
    }
  }

  return (

    <div className='bg'>
      <div className='blck'>

        <div id='sup' className='center'>
          <h1>Unlimited movies, TV shows, and more.</h1>
          <p>Watch anywhere. Cancel anytime.</p>
          <p>Ready to watch? Enter your email to create or restart your membership.</p>

          <form onSubmit={Submit}>

            <div className={toggle ? "show" : "not"}>
              <input placeholder='Email Address' name='email' id='email' type='text' value={user.email} onChange={handleInput} />
              <button type='button' onClick={ToggleBtn}>Get Started</button>
            </div>

            <div className={!toggle ? "show" : "not"}>
              <input placeholder='Create Password' name='password' id='password' type='password' value={user.password} onChange={handleInput} />
              <button type='submit'>Sign Up</button>
            </div>

          </form>

          {message && <span className='error'>{message}</span>}

        </div>

        <div id='sin' style={{display:'none',margin:'auto'}}>
          <Signin />
        </div>

      </div>
    </div>
  )
}

export default Flix