import React from 'react'
import useGetUser from '../../hooks/useGetUser';
import useStore from '../../zustand/useStore';
import { formatMessageDate } from '../../utils/timestamps/dateFormat';

const Message = ({ message }) => {

  const {authUser} = useGetUser();
  const {selectedConversation} = useStore();
  const sender = message?.senderId === authUser?._id;
  const profileImg = sender ? authUser.profileImg : selectedConversation.profileImg
  const messageDate = formatMessageDate(message.createdAt)
  const bubbleBg = sender ? "bg-primary" : "";
  
  return (
    <>
      <div className={`chat ${sender? 'chat-end' : 'chat-start'} `}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={profileImg || '/avatar.jpeg'} />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50">{messageDate}</time>
        </div>
        <div className={`chat-bubble ${bubbleBg}`}>{message.message}</div>
        {/* <div className="chat-footer opacity-50">Delivered</div> */}
      </div>
    </>
  )
}

export default Message