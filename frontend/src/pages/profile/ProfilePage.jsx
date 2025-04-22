import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import Header from "../../components/Header.jsx"
import useUpdateProfile from '../../hooks/useUpdateProfile.js';
import useGetUserProfile from '../../hooks/useGetUserProfile.js';
import useGetGameList from '../../hooks/useGetGameList.js';
import LoadingState from '../../components/common/LoadingState.jsx';
import useDeleteGame from '../../hooks/useDeleteGame.js';
import toast from 'react-hot-toast';
import useGetUser from '../../hooks/useGetUser.js';
import useUpdateGameList from '../../hooks/useUpdateGameList.js';

const ProfilePage = () => {

  const { id } = useParams();

  const {authUser} = useGetUser()
  const {updateProfile, isPending} = useUpdateProfile();
  const {getUserProfile, refetch} = useGetUserProfile({id});
  const {gameList} = useGetGameList();
  const {deleteGame, isPending: isPendingDelete} = useDeleteGame();
  const {updateGameList, isPending:isPendingGameList} = useUpdateGameList();

  const myProfile = id === authUser?._id;

  const [profileImg, setProfileImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);

  const profileImgRef = useRef(null);
  const coverImgRef = useRef(null);

  const handleImgSubmit = async(e) => {
    e.preventDefault();
    await updateProfile({profileImg, coverImg});
  }

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if(type === "profile") setProfileImg(reader.result);
        if(type === "cover") setCoverImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    refetch();
  }, [id])

  const [formData, setFormData] = useState({
    username: "",
    tagName: "",
    bio: "",
  });

  const [games, setGame] = useState("");

  const handleGameSubmit = (e) => {
    e.preventDefault();
    if (!games) {
      toast.error("Please select a game");
      return;
    };
    updateGameList({games});
  }

  const handleGameChange = (e) => {
    setGame(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  }

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const badgeList = [
    "badge-info",
    "badge-success",
    "badge-warning",
    "badge-error",
  ];

  return (
    <div className='bg-figma_primary h-screen py-4 px-8 md:px-14'>
      <Header />
      
      {/* BACKGROUND IMAGE */}
      <div className='flex flex-col mx-auto max-w-full md:max-w-7xl bg-figma_bg max-h-96 rounded-b-md overflow-hidden relative'>
        <img 
          src={coverImg || getUserProfile?.coverImg || '/valorant.png'} 
          className='object-contain' 
        />
        {myProfile && (
          <>
            <div
              onClick={()=>coverImgRef.current.click()} 
              className='group absolute w-full h-full bg-figma_primary bg-opacity-0 hover:bg-opacity-25 z-10 cursor-pointer'
            />
          <input 
              hidden type="file" accept="image/*" ref={coverImgRef}
              onChange={(e) => handleImageChange(e, 'cover')}
            />
          </>
        )}
      </div>
      
      <div className='flex flex-col mx-auto max-w-7xl h-96'>
      <div className='absolute translate-x-7 -translate-y-10 md:-translate-y-20 z-20'>
        <img 
          src={profileImg || getUserProfile?.profileImg || '/avatar.jpeg'} 
          alt="Profile" 
          className='h-28 w-28 md:h-40 md:w-40 rounded-full overflow-hidden border border-figma_primary' 
        />
        {myProfile && (
          <>
          <div 
            onClick={() => profileImgRef.current.click()}
            className='bg-gray-900 opacity-0 hover:opacity-100 bg-opacity-0 cursor-pointer hover:bg-opacity-25 rounded-full h-28 md:h-40 -translate-y-28 md:-translate-y-40 flex justify-center items-center'
          >
          </div>
          <input 
            hidden type="file" accept="image/*" ref={profileImgRef}
            onChange={(e) => handleImageChange(e, 'profile')}
          />
        </>
        )}
      </div>
        <div className='flex justify-between max-sm:flex-col md:pl-52 max-md:mt-20 max-lg:mt-0 w-full'>
          <h2 className='text-lg sm:text-2xl font-bold mt-4'>{getUserProfile?.username} <span className='opacity-50'>#{getUserProfile?.tagName}</span></h2>
          
          {!profileImg && !coverImg && myProfile && (
            <button 
              onClick={()=>document.getElementById('edit-profile').showModal()} 
              className='btn btn-sm md:btn-md lg:btn-lg btn-primary max-sm:mt-2 sm:mt-4 sm:mr-8 text-slate-100'
            > 
              Edit Profile
            </button>
          )}

          {(profileImg || coverImg) &&  (
            <>
              <div>
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    setProfileImg(null);
                    setCoverImg(null);
                  }}
                  className='btn btn-sm md:btn-md lg:btn-lg btn-secondary max-sm:mt-2 sm:mt-4 sm:mr-8 text-slate-100'
                >
                  Cancel
                </button>
                <button
                  onClick={async (e) => {
                    await handleImgSubmit(e);
                    setProfileImg(null);
                    setCoverImg(null);
                  }}
                  className='btn btn-sm md:btn-md lg:btn-lg btn-primary max-sm:mt-2 sm:mt-4 sm:mr-8 text-slate-100'
                >
                  {isPending ? 'Updating...' : 'Update'}
                </button>
              </div>
            </>
          )}
        </div>

        

        <div className='flex flex-wrap gap-2 mt- lg:mt-0 md:pl-52 max-w-4xl'>
          <div className={`${!myProfile ? "mt-2" : ""}`}>
            {getUserProfile?.games?.map((game, index) => (
              <>
                <div key={index} className={`badge ${badgeList[index]} gap-2 mx-1`}>
                  <button onClick={() => deleteGame(game)}>
                    {(myProfile && !isPendingDelete) && (
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
                    )}
                  </button>
                  {game}
                </div>
              </>
            ))}
          </div>
        
          {myProfile && (
            <button
              onClick={()=>document.getElementById('edit-games').showModal()} 
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
            </button>
          )}
        </div>
        <div className='md:pl-52 mt-5'>
          <p className='text-lg opacity-90 max-w-4xl'>{getUserProfile?.bio}</p>
        </div>
      </div>

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
          
          <form onSubmit={handleSubmit}>
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
                  <input 
                    type="text" 
                    className="grow" 
                    placeholder="Username" 
                    onChange={handleOnChange} 
                    name='username'
                    value={formData.username}
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 lucide lucide-hash-icon lucide-hash">
                    <line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
                  <input 
                    type="text" 
                    className="grow" 
                    placeholder="Tag Name" 
                    minLength={4} 
                    maxLength={4} 
                    onChange={handleOnChange} 
                    value={formData.tagName}  
                    name='tagName'
                  />
                </label>
                <textarea 
                  className="textarea textarea-bordered w-full max-w-xs mt-4" 
                  placeholder="Bio..." 
                  onChange={handleOnChange} 
                  name='bio' 
                />
              </div>
              <div className='col-span-1 flex items-center justify-center'>
                <button className='btn btn-sm md:btn-md btn-primary float-right text-slate-100 uppercase'>
                  {isPending? <LoadingState size={'sm'} /> : 'Save'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>

      <dialog id="edit-games" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">
            Select a game you want to add
          </h3>
          
          <form onSubmit={handleGameSubmit}>
            <div className='grid grid-cols-3'>
              <div className='col-span-2'>
              <label>
                <select className='select focus:outline-none input-sm border border-black rounded-md w-full mt-4'
                name='games' 
                defaultValue={games}
                onChange={handleGameChange}
                >
                  <option value={games} disabled>Pick one</option>
                  {gameList?.map((game, index) => (
                    <option key={index}>{game}</option>
                  ))}
                </select>
            </label>
              </div>
              <div className='col-span-1 flex mt-auto justify-center items-center'>
                <button 
                  className='btn btn-md btn-primary float-right text-slate-100 uppercase px-8'
                >
                  {isPending ? <LoadingState size='md' /> : 'Add'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default ProfilePage