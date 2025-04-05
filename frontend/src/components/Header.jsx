import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      {/* HEADER  */}
      <div className='flex justify-between items-center border-b border-slate-600 py-2'>
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
              
              <div className='grid grid-cols-3'>
                <div className='col-span-2'>
                  <h2 className='py-2 text-slate-100'>Game</h2>
                  <input type="text" placeholder="Valorant" className="input input-bordered w-full max-w-xs" />
                  
                  <h2 className='py-2 text-slate-100'>Rank</h2>
                  <input type="text" placeholder="Silver" className="input input-bordered w-full max-w-xs" />
                  <h2 className='py-2 text-slate-100'>Game Type</h2>
                  <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Pick one</option>
                    <option>Competitive</option>
                    <option>Casual</option>
                    <option>Tournament</option>
                  </select>
                  <h2 className='py-2 text-slate-100'>Description</h2>
                  <textarea className="textarea textarea-bordered w-full max-w-xs" placeholder="Looking for duo"></textarea>
                </div>
                <div className='col-span-1 flex items-center justify-center'>
                  <button className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary float-right text-slate-100 uppercase md:px-8 rounded-sm px-4 md:rounded-md'>Post</button>
                </div>
              </div>
            </div>
          </dialog>

          <div className='flex items-center gap-2'>
            <Link to={'/profile/1'} className='flex items-center gap-1 p-2 hover:bg-gray-700 hover:bg-opacity-30 rounded-full'>
              <div className="avatar">
                <div className="h-8 rounded-full">
                  <img src="/avatar.jpeg" />
                </div>
              </div>
              <p className='hidden md:block'>John Doe</p>
              <button onClick={(e) => {
                e.preventDefault();
              }} className='ml-4'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out-icon lucide-log-out hover:text-red-500"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
