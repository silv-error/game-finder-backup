import React from 'react'

const ChatHistory = ({chat}) => {
  return (
    <>
      {chat.isOnline && (
        <> 
          <div className='flex flex-row cursor-pointer'>
            <div className='flex flex-col lg:flex-row h-20 hover:bg-gray-400 hover:bg-opacity-15 items-center rounded-lg gap-2 lg:py-0 py-2 px-4 w-full '>
              <div className="avatar online">
                <div className="w-16 lg:w-10 rounded-full">
                  <img src={chat.img} />
                </div>
              </div>
              <h2 className='whitespace-nowrap hidden lg:block'>{chat.username} <span className='opacity-55 hidden sm:block'>#{chat.tagName}</span></h2>
              {/* <div className={`h-3 w-3 ${user.isOnline ? 'bg-green-500' : ''} rounded-full ml-auto`}></div> */}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ChatHistory