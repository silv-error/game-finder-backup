import React from 'react'
import { Link } from 'react-router-dom'
import useStore from '../../zustand/useStore.js'

const LatestPost = ({ post }) => {

  const {setSelectedConversation} = useStore();
  const MAX_LENGTH = 50
  return (
    <>
        <div className='flex justify-between w-full'>
          <div className='badge badge-lg'>{post.type} </div>
          <div className='badge badge-xs sm:badge-sm md:badge-md badge-primary text-slate-100 p-4'>{post.name} </div>
        </div>
        <div className='flex justify-center w-full max-h-[480px] mt-2 md:mt-4'>
          <img src={post.user.coverImg || '/valorant.png'} className='rounded-xl object-cover' />
        </div>
        <div className='flex justify-between md:mt-4'>
          <Link to={`/profile/${post.user._id}`} className='flex items-center gap-2 text-start'>
            <img src={post.user.profileImg || '/avatar.jpeg'} className='w-8 h-8 sm:w-12 sm:h-12 rounded-full' />
            <div>
              <h2 className='font-medium text-sm md:text-lg'>{post.description.length > MAX_LENGTH ? `${post.description.substring(0, MAX_LENGTH)}...` : post.description} </h2>
              <p className='text-slate-400'>@{post.user.username}</p>
            </div>
          </Link>
          <div className='flex flex-col sm:flex-row items-center gap-2 mt-2 md:gap-4 md:mt-2'>
            <button
              className='btn btn-xs sm:btn-sm md:btn-md btn-secondary text-slate-100 rounded-md'
              onClick={()=>document.getElementById(post._id).showModal()}
            >
              View Details
            </button>
            <Link 
              to={`/chat/${post.user._id}`}
              onClick={()=>setSelectedConversation(post.user)}
            >
              <button onClick={()=>setSelectedConversation(post.user)} className='btn btn-xs sm:btn-sm md:btn-md btn-primary text-slate-100 rounded-md'>
                Connect
              </button>
            </Link>
          </div>
        </div>

      {/* HIGHLIGHTED POST DETAILS MODAL */}
      <dialog id={post._id} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">
            Invite Details
          </h3>
          
          <div className='grid grid-cols-3'>
            <div className='col-span-2'>
              <h2 className='py-2 text-slate-100 font-medium'>Game</h2>
              <p className='text-lg'>{post.name}</p>
              
              <h2 className='py-2 text-slate-100 font-medium'>Rank</h2>
              <p className='text-lg'>{post.rank}</p>
              
              <h2 className='py-2 text-slate-100 font-medium'>Game Type</h2>
              <p className='text-lg'>{post.type}</p>
              
              <h2 className='py-2 text-slate-100 font-medium'>Description</h2>
              <p className='text-lg'>{post.description}</p>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default LatestPost