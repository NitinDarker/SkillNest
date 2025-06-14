import axios from 'axios'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage () {
  const [message, setMessage] = useState('Hi there!')
  const usernameRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()

  async function makeRequest () {
    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        username: usernameRef.current,
        password: passwordRef.current
      })
      setMessage(response.data.message)
    } catch (e) {
      setMessage(e.response.data.message)
    }
  }

  function redirectUser () {
    navigate(-1)
  }

  function handleChangeUsername (e) {
    usernameRef.current = e.target.value
  }

  function handleChangePassword (e) {
    passwordRef.current = e.target.value
  }

  return (
    <>
      <div>{message}</div>
      <div>
        <input onChange={handleChangeUsername} placeholder='Enter username' />
        <br />
        <input onChange={handleChangePassword} placeholder='Enter password' />
        <br />
        <button onClick={makeRequest}>Login</button>
      </div>
      <button onClick={redirectUser}>Go back</button>
    </>
  )
}
