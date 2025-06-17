import React from "react";
import { Link } from "react-router-dom";
import { useSocketContext } from "../../context/SocketContext";
import useStore from "../../zustand/useStore.js";

const ActivePlayers = ({ user }) => {
  const { onlineUsers } = useSocketContext();
  const { setSelectedConversation } = useStore();

  const onlineUser = onlineUsers.includes(user?._id);

  return (
    <>
      <Link to={`/chat/${user?._id}`} onClick={() => setSelectedConversation(user)}>
        <div className="flex flex-row cursor-pointer">
          <div className="flex flex-col lg:flex-row h-20 hover:bg-gray-400 hover:bg-opacity-15 items-center rounded-lg gap-2 lg:py-0 py-2 px-4 w-full ">
            <div className={`avatar ${onlineUser ? "online" : ""} `}>
              <div className="w-10 rounded-full">
                <img src={user.profileImg || "/avatar.jpeg"} />
              </div>
            </div>
            <h2 className="whitespace-nowrap">
              {user.username} <span className="hidden lg:inline-block opacity-55">#{user.tagName}</span>
            </h2>
            {/* <div className={`h-3 w-3 ${user.isOnline ? 'bg-green-500' : ''} rounded-full ml-auto`}></div> */}
          </div>
        </div>
      </Link>
    </>
  );
};

export default ActivePlayers;
