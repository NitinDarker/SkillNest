import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import LandingPage from '../components/LandingPage'
import LoginPage from '../components/LoginPage'
import CourseDisplay from '../components/CourseDisplay'

function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/course' element={<CourseDisplay />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
