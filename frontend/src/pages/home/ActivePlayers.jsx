import React from 'react'

const ActivePlayers = ({user}) => {
  return (
    <>
      {user.isOnline && (
        <> 
          <div className='flex flex-row cursor-pointer'>
            <div className='flex flex-col lg:flex-row h-20 hover:bg-gray-400 hover:bg-opacity-15 items-center rounded-lg gap-2 lg:py-0 py-2 px-4 w-full '>
              <div className="avatar online">
                <div className="w-10 rounded-full">
                  <img src={user.img} />
                </div>
              </div>
              <h2 className='whitespace-nowrap'>{user.username} <span className='hidden lg:inline-block opacity-55'>#{user.tagName}</span></h2>
              {/* <div className={`h-3 w-3 ${user.isOnline ? 'bg-green-500' : ''} rounded-full ml-auto`}></div> */}
            </div>
          </div>
          <div className='flex flex-row cursor-pointer'>
            <div className='flex flex-col lg:flex-row h-20 hover:bg-gray-400 hover:bg-opacity-15 items-center rounded-lg gap-2 lg:py-0 py-2 px-4 w-full '>
              <div className="avatar online">
                <div className="w-10 rounded-full">
                  <img src={user.img} />
                </div>
              </div>
              <h2 className='whitespace-nowrap'>{user.username} <span className='hidden lg:inline-block opacity-55'>#{user.tagName}</span></h2>
              {/* <div className={`h-3 w-3 ${user.isOnline ? 'bg-green-500' : ''} rounded-full ml-auto`}></div> */}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ActivePlayers