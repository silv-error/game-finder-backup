import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'

import Header from "../../components/Header.jsx"

const ProfilePage = () => {

  const { username } = useParams();

  const imgRef = useRef();

  return (
    <div className='bg-figma_primary h-screen py-4 px-8 md:px-14'>
      <Header />
      
      {/* BACKGROUND IMAGE */}
      <div className='flex flex-col mx-auto max-w-full md:max-w-7xl bg-figma_bg max-h-96 rounded-b-md overflow-hidden'>
        <img src='/valorant.png' className='object-cover' />
      </div>
      
      <div className='flex flex-col mx-auto max-w-7xl h-96'>
        <div className='absolute translate-x-7 -translate-y-10 md:-translate-y-20'>
          <img src='/avatar.jpeg' className='h-28 md:h-40 rounded-full border border-figma_primary hover:opacity-55' />
          <div 
            onClick={()=>imgRef.current.click()}
            className='bg-gray-900 opacity-0 hover:opacity-100 bg-opacity-0 hover:bg-opacity-25 rounded-full h-28 md:h-40 -translate-y-28 md:-translate-y-40 flex justify-center items-center'
          >
            <h2 className='font-medium text-xs md:text-lg text-slate-100 cursor-default'>Select Image</h2>
          </div>
          <input type="file" accept="image/*" ref={imgRef} className='hidden' />
        </div>
        <div className='flex justify-between max-sm:flex-col md:pl-52 max-md:mt-20 max-lg:mt-0 w-full'>
          <h2 className='text-lg sm:text-2xl font-bold mt-4'>John Doe <span className='opacity-50'>#0000</span></h2>
          
          <button 
            onClick={()=>document.getElementById('edit-profile').showModal()} 
            className='btn btn-sm md:btn-md lg:btn-lg btn-primary max-sm:mt-2 sm:mt-4 sm:mr-8 text-slate-100'
          > 
            Edit Profile
          </button>

          {/* EDIT PROFILE MODAL */}
          <dialog id="edit-profile" className="modal">
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

                  {/* INPUTS  */}
                  <label className="input input-bordered flex items-center gap-2 mt-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70">
                      <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Username" />
                  </label>

                  <label className="input input-bordered flex items-center gap-2 mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 lucide lucide-hash-icon lucide-hash">
                      <line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
                    <input type="text" className="grow" placeholder="Tag Name" minLength={4}/>
                  </label>

                  <textarea className="textarea textarea-bordered w-full max-w-xs mt-4" placeholder="Bio..."></textarea>

                </div>
                <div className='col-span-1 flex items-center justify-center'>
                  <button className='btn btn-sm md:btn-md btn-primary float-right text-slate-100 uppercase'>Save</button>
                </div>
              </div>
            </div>
          </dialog>

        </div>
        <div className='flex flex-wrap gap-2 mt-2 lg:mt-0 md:pl-52'>
        <div className="badge badge-info gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-4 w-4 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          Minecraft
        </div>
        <div className="badge badge-success gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-4 w-4 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          Valorant
        </div>
        <div className="badge badge-warning gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-4 w-4 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          League of Legends
        </div>
        <div className="badge badge-error gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-4 w-4 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          Dota 2
        </div>
          
          <button
            onClick={()=>document.getElementById('edit-games').showModal()} 
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
          </button>

          <dialog id="edit-games" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <h3 className="font-bold text-lg">
                Select a game you want to add
              </h3>
              
              <div className='grid grid-cols-3'>
                <div className='col-span-2'>
                  <select className="select select-bordered w-full max-w-xs mt-4">
                    <option disabled selected>Pick one</option>
                    <option>Valorant</option>
                    <option>Minecraft</option>
                    <option>League of Legends</option>
                    <option>CS2</option>
                    <option>Dota 2</option>
                    <option>Apex Legends</option>
                    <option>Fortnite</option>
                    <option>Call of Duty: Warzone</option>
                    <option>Among Us</option>
                    <option>Genshin Impact</option>
                    <option>Rainbow Six Siege</option>
                    <option>Overwatch</option>
                    <option>Destiny 2</option>
                    <option>Sea of Thieves</option>
                    <option>Rust</option>
                    <option>World of Warcraft</option>
                    <option>Final Fantasy XIV</option>
                    <option>Monster Hunter: World</option>
                    <option>Phasmophobia</option>
                    <option>ARK: Survival Evolved</option>
                  </select>
                </div>
                <div className='col-span-1 flex mt-auto justify-center items-center'>
                  <button className='btn btn-md btn-primary float-right text-slate-100 uppercase px-8'>Add</button>
                </div>
              </div>
            </div>
          </dialog>
        </div>
        <div className='md:pl-52 mt-5'>
          <p className='text-lg opacity-90 max-w-4xl'>Best player dude.</p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage