import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage () {
  const [response, setResponse] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    async function makeRequest () {
      const res = await axios.get('http://localhost:3000/')
      return res.data.message
    }
    setResponse(makeRequest())
  }, [])

  return (
    <>
      <div>{response}</div>
      <button onClick={() => navigate('/user/login')}>Login</button>
      <button onClick={() => navigate('/user/signup')}>Signup</button>
    </>
  )
}
