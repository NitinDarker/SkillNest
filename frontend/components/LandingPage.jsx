import axios from 'axios'
import { useEffect, useState } from 'react'

export default function LandingPage () {
  const [response, setResponse] = useState()
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
    </>
  )
}
