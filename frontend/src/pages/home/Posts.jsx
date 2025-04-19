import React from 'react'
import { Link } from 'react-router-dom';
import useStore from '../../zustand/useStore';
import useGetUser from '../../hooks/useGetUser';

const Posts = ({ post }) => {
  
  const {authUser} = useGetUser();

  const myPost = authUser?._id === post.user?._id

  let bgColor = "bg-blue-600";
  if(post.type === "Tournament") bgColor = "bg-rose-600";
  if(post.type === "Casual") bgColor = "bg-green-600";

  const {setSelectedConversation} = useStore();

  return (
    <>
      <div key={post.user.username} className='flex flex-col justify-around h-48 bg-gray-800 rounded-lg p-4 cursor-default' >
        <div className='flex'>
          <div className={`badge ${bgColor} p-2`}>{post.type}</div>
          <button 
            className='btn btn-xs btn-secondary ml-auto text-slate-100'
            onClick={()=>document.getElementById(post._id).showModal()}
          > 
            View Details
          </button>
          {!myPost && <Link 
            to={`/chat/${post.user?._id}`} 
            onClick={() => setSelectedConversation(post.user)}
            className='btn btn-xs btn-primary ml-2 text-slate-100'
          >
            Connect
          </Link>}
        </div>
        <Link to={`/profile/${post.user?._id}`} className='flex gap-2 items-center w-full'>
          <img src={post.user.profileImg || '/avatar.jpeg'} className='w-10 h-10 rounded-full' />
          <div className='w-full flex flex-wrap flex-col'>
            <p className='font-medium'>{post.description.length > 120 
        ? `${post.description.substring(0, 120)}...` 
        : post.description}</p>
            <p className='text-sm text-slate-400'>@{post.user.username}</p>
          </div>
        </Link>
        <div className='flex justify-between'>
          <h2 className='font-medium'>Rank Required</h2>
          <p className='badge badge-outline'>{post.rank}</p>
        </div>
        <div className='flex justify-between'>
          <h2 className='font-medium'>Game</h2>
          <p className='badge badge-ghost'>{post.name}</p>
        </div>
      </div>

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

export default Posts