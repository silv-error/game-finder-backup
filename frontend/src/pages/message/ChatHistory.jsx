import React, { useRef } from 'react'
import useStore from '../../zustand/useStore'
import { useSocketContext } from '../../context/SocketContext'
import { Link } from 'react-router-dom';

const ChatHistory = ({ chat }) => {

  const {onlineUsers} = useSocketContext();
  const {setSelectedConversation, selectedConversation} = useStore();
  const selectedUser = selectedConversation?._id === chat?._id;
  
  let isOnline = onlineUsers.includes(chat._id);
  return (

    <> 
      <Link 
        className='flex flex-row cursor-pointer w-full'
        to={`/chat/${chat._id}`}
        onClick={()=>setSelectedConversation(chat)}
      >
        <div className={`flex h-20 ${selectedUser ? "bg-gray-400 bg-opacity-15" : ""} hover:bg-gray-400 hover:bg-opacity-15 items-center rounded-lg gap-2 lg:py-0 py-2 px-4 w-full`}>
          <div className={`avatar ${isOnline ? 'online' : ''}`}>
            <div className="max-w-16 lg:w-10 rounded-full">
              <img src={chat.profileImg || '/avatar.jpeg'} />
            </div>
          </div>
          <h2 className='whitespace-nowrap hidden lg:flex gap-1'>{chat.username} 
            <span className='opacity-55 hidden sm:block'>
              #{chat.tagName}
            </span>
          </h2>
        </div>
      </Link>
    </>
  )
}

export default ChatHistory