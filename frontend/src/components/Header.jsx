import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { LogOut } from 'lucide-react';
import LoadingState from './common/LoadingState';
import useCreatePost from '../hooks/useCreatePost';
import { useQuery } from '@tanstack/react-query';
import useGetUser from '../hooks/useGetUser';

const Header = () => {

  const {logout, loading} = useLogout();
  const {authUser} = useGetUser();
  let location = useLocation();

  const {createPost, loading: postLoading} = useCreatePost();

  const [formData, setFormData] = useState({
    name: "",
    rank: "",
    type: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(formData);
  }

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <>
      {/* HEADER  */}
      <div className={`flex justify-between items-center border-b border-slate-600 py-2 sticky inset-0 top-0 z-30 bg-figma_primary ${location.pathname.split("/")[1] === "profile" ? "bg-figma_primary" : "bg-gray-900"} bg-opacity-55 backdrop-blur`}>
        <Link to={'/'}><h1 className='text-2xl md:text-3xl lg:text-4xl font-medium mr-4'>GameHunter</h1></Link>
        <div className='flex items-center gap-10'>
          <button 
            onClick={()=>document.getElementById('post').showModal()} 
            className='btn btn-xs md:btn-sm lg:btn-md btn-primary uppercase rounded-sm px-4 md:px-8 text-slate-100'
          > 
            Post
          </button>


          {/* MODAL  */}
          <dialog id="post" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <h3 className="font-bold text-lg">
                Start looking for your perfect team!
              </h3>
              
              <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-3'>
                  <div className='col-span-2'>
                    <h2 className='py-2 text-slate-100'>Game</h2>
                    <input 
                      type="text" 
                      placeholder="Valorant" 
                      className="input input-bordered w-full max-w-xs" 
                      name='name'
                      value={formData.name}
                      onChange={handleOnChange}
                    />
                
                    <h2 className='py-2 text-slate-100'>Rank</h2>
                    <input 
                      type="text" 
                      placeholder="Silver" 
                      className="input input-bordered w-full max-w-xs" 
                      name='rank'
                      value={formData.rank}
                      onChange={handleOnChange}
                    />
                    <h2 className='py-2 text-slate-100'>Game Type</h2>
                    <select 
                      className="select select-bordered w-full max-w-xs"
                      name='type'
                      onChange={handleOnChange}
                      defaultValue="" // Set defaultValue to an empty string
                    >
                      <option value="" disabled>Pick one</option> {/* Set value to an empty string */}
                      <option value="Competitive">Competitive</option>
                      <option value="Casual">Casual</option>
                      <option value="Tournament">Tournament</option>
                    </select>
                    <h2 className='py-2 text-slate-100'>Description</h2>
                    <textarea 
                      className="textarea textarea-bordered w-full max-w-xs" 
                      placeholder="Looking for duo"
                      name='description'
                      value={formData.description}
                      onChange={handleOnChange}  
                    ></textarea>
                  </div>
                  <div className='col-span-1 flex items-center justify-center'>
                    <button className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary float-right text-slate-100 uppercase md:px-8 rounded-sm px-4 md:rounded-md'>
                      {postLoading ? <LoadingState size={"sm"} /> : "Post"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </dialog>

          <div className='flex items-center gap-2'>
            <Link to={`/profile/${authUser?._id}`} className='flex items-center gap-1 p-2 hover:bg-gray-700 hover:bg-opacity-30 rounded-full'>
              <div className="avatar">
                <div className="h-8 rounded-full">
                  <img src={authUser?.profileImg || '/avatar.jpeg'} />
                </div>
              </div>
              <p className='hidden md:block'>{authUser?.username}</p>
              <button onClick={(e) => {
                e.preventDefault();
                logout();
              }} className='ml-4'>
                {loading ? <LoadingState size={"sm"} /> : <LogOut /> }
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
