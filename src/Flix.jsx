import { useRef, useState } from 'react'
import './CSS Files/Flix.css'
import Signin from './Signin'

const Flix = () => {

  // const emailRef = useRef()
  const [users, setUsers] = useState({
    email: '',
    password: '',
  })

  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [toggle, setToggle] = useState(true)

  console.log(users.email)
  console.log(users.password)

  const handleInput = (e) => {
    const name = (e.target.name)
    const value = (e.target.value)

    setUsers({ ...users, [name]: value })
  }

  // const Submit = (e) => {
  //   e.preventDefault()

  //   // setUsers({
  //   //   email: '',
  //   //   password: '',
  //   // })
  // }

  const Submit = (e) => {
    e.preventDefault()
    if (users.email && users.password) {

      setToggle(!toggle)
      setMessage('Registered Sucessfully! You can now signIn')

      // setUsers({
      //   email: '',
      //   password: '',
      // })

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
    if (users.email) {
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
              <input placeholder='Email Address' name='email' type='text' value={users.email} onChange={handleInput} />
              <button type='button' onClick={ToggleBtn}>Get Started</button>
            </div>

            <div className={!toggle ? "show" : "not"}>
              <input placeholder='Create Password' name='password' type='password' value={users.password} onChange={handleInput} />
              <button type='submit'>Sign Up</button>
            </div>

          </form>

          {message && <span className='error'>{message}</span>}

        </div>

        <div id='sin' style={{display:'none',margin:'auto'}}>
          <Signin users={users}/>
        </div>

      </div>
    </div>
  )
}

export default Flix