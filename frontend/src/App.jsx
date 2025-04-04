import { Routes, Route } from 'react-router-dom'

import LoginPage from './pages/auth/login/LoginPage.jsx'
import SignupPage from './pages/auth/signup/SignupPage.jsx'

import HomePage from './pages/home/HomePage.jsx'
import ProfilePage from './pages/profile/ProfilePage.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
    </>
  )
}

export default App
