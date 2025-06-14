import axios from 'axios'
import { useEffect, useState } from 'react'

export default function CourseDisplay () {
  const [response, setResponse] = useState()
  useEffect(() => {
    async function makeRequest () {
      const res = await axios.get('http://localhost:3000/course')
      return res.data.available;
    }
    setResponse(makeRequest())
  }, [])
  return (
    <>
      <div>{response}</div>
    </>
  )
}
