import { useNavigate } from 'react-router-dom'

export default function LoginPage () {
  const navigate = useNavigate()
  function redirectUser () {
    navigate('/')
  }

  return (
    <>
      <div>Hi there</div>
      <div>
        <input placeholder='Enter username' />
        <br />
        <input placeholder='Enter password' />
        <br />
        <button>Send</button>
      </div>
      <button onClick={redirectUser}>Go back</button>
    </>
  )
}
