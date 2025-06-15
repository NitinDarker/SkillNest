import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import LandingPage from '../components/LandingPage'
import LoginPage from '../components/LoginUser'
import SignupUser from '../components/SignupUser'
import CourseDisplay from '../components/CourseDisplay'

function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/user/login' element={<LoginPage />} />
          <Route path='/user/signup' element={<SignupUser />} />
          <Route path='/course' element={<CourseDisplay />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
