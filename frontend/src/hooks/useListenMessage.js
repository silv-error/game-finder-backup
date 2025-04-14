import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext.jsx'
import useStore from '../zustand/useStore.js'
import notif from '../assets/notif.mp3'
import { toast } from "react-hot-toast"
import { useLocation } from 'react-router-dom'

const useListenMessage = () => {
  
  let location = useLocation();

  const {socket} = useSocketContext();
  const {messages, setMessages, selectedConversation} = useStore();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      
      const audio = new Audio(notif);
      audio.play();
      if (newMessage.senderId === selectedConversation._id) setMessages([...messages, newMessage]);

      location.pathname.split("/")[1] != 'chat' && toast(newMessage.message,
        {
          icon: '💬',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages, location]);
}

export default useListenMessage