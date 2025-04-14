import { Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'

import LoginPage from './pages/auth/login/LoginPage.jsx'
import SignupPage from './pages/auth/signup/SignupPage.jsx'

import HomePage from './pages/home/HomePage.jsx'
import ProfilePage from './pages/profile/ProfilePage.jsx'
import ChatPage from './pages/message/ChatPage.jsx'
import LoadingState from './components/common/LoadingState.jsx'
import useGetUser from './hooks/useGetUser.js'
import useListenMessage from './hooks/useListenMessage.js'

function App() {

  useListenMessage();
  const {authUser, isLoading} = useGetUser();

  if(isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <LoadingState size="lg" />
      </div>
    )
  }

  return (
    <>
      <div className='roboto-main'>
        <Routes>
          <Route path="/" element={authUser? <HomePage /> : <Navigate to="/login" /> } />
          <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser? <LoginPage /> : <Navigate to="/" /> } />
          <Route path="/profile/:id" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/chat/:id" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default App
