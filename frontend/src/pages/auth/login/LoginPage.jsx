import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const [formData, setFormData] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 h-screen'>
      <div className='hidden bg-primary lg:flex justify-end items-end overflow-hidden w-full'>
        <img src='/bloodhound.png' height={400} className='h-5/6 w-auto object-cover'/>
      </div>
      <div className='h-screen bg-gray-900 w-96 mx-auto flex flex-col justify-center'>
        <h2 className='text-2xl font-bold text-center'>Game Hunter</h2>
        <form onSubmit={handleSubmit} className='mt-10 flex flex-col gap-5 px-4'>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input 
              type="text"
              name="username"
              onChange={handleChange}
              className="w-96 grow"
              placeholder="Username"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd" />
            </svg>
            <input 
              type="password"
              name='password'
              onChange={handleChange}
              className="grow" 
              placeholder='Password'
            />
          </label>
          <button className="btn btn-primary mt-10 w-3/5 mx-auto text-gray-100 uppercase font-medium rounded-sm">Login</button>
          <div className='flex items-center gap-4 mt-10'>
            <div className='bg-slate-400 w-full h-[0.5px]' />
            <p className='w-full text-slate-400 text-center whitespace-nowrap'>Don't have an account?</p>
            <div className='bg-slate-400 w-full h-[0.5px]' />
          </div>
          <Link to={'/signup'} className="w-3/5 mx-auto text-gray-100 text-center uppercase font-medium">Create an account</Link>
        </form>
      </div>
    </div>
  )
}

export default LoginPage