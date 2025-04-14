import Message from './Message.jsx';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, Send } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import ChatHistory from './ChatHistory.jsx';
import useGetMessages from '../../hooks/useGetMessages.js';
import useGetChatHistory from '../../hooks/useGetChatHistory.js';
import useSendMessage from '../../hooks/useSendMessage.js';
import useListenMessage from '../../hooks/useListenMessage.js';
import useStore from '../../zustand/useStore.js';
import { useSocketContext } from '../../context/SocketContext.jsx';

const ChatPage = () => {
    const { id } = useParams();

    const [message, setMessage] = useState("");
    const { messages } = useGetMessages({ id });
    const {chatHistory} = useGetChatHistory();
    const {selectedConversation} = useStore();
    
    const textareaRef = useRef(null);
    const lineHeight = 24; // Adjust this value based on your font size and line height
    const lastMessageRef= useRef();
    
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ block: 'end' });
        }
    }, [messages]);
    
    useEffect(() => {
        // Reset the height to auto to calculate the new height
        textareaRef.current.style.height = 'auto';
        // Set the height to the scroll height to fit the content
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, lineHeight * 3)}px`;
    }, [message]); // Run this effect whenever the value changes

    const { sendMessage } = useSendMessage({ id });

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage({message});
        setMessage("")
    }

    const handleOnChange = (e) => {
        setMessage(e.target.value);
    }

    const badgeList = [
        "badge-info",
        "badge-success",
        "badge-warning",
        "badge-error",
    ];

    return (
        <div className='h-screen grid grid-cols-12 bg-figma_primary'>
            {/* CONVERSATIONS HISTORY  */}
            <div className='col-span-2 border-r border-white border-opacity-20'>
                <div className='flex flex-col h-screen'>
                    <div className='flex flex-2 items-center bg-figma_bg p-4'>
                        <h2 className='text-md md:text-2xl font-bold'>Chat History</h2>
                    </div>
                    <div className='flex-10 overflow-y-auto'>
                        {chatHistory?.map((chat) => (
                            <ChatHistory chat={chat} key={chat._id} senderId={id} />
                        ))}
                    </div>
                </div>
            </div>

            {/* MESSAGE CONTAINER */}
            {!selectedConversation ? (
                <>
                    <div className='col-span-10 lg:col-span-7 flex flex-col justify-between h-screen border-r-[1px] border-opacity-25 border-white'>
                        <div className='flex items-center gap-4 p-8 bg-figma_bg'>
                            <Link to={'/'} className='btn btn-secondary bg-opacity-15 hover:bg-opacity-15 text-slate-100 border-0'>
                                <ChevronLeft />
                            </Link>
                            <img src={selectedConversation?.profileImg} className='w-10 lg:w-14 rounded-full' />
                            <h1 className='text-xl lg:text-4xl font-bold'>{selectedConversation?.username} </h1>
                        </div>
                        <h2 className='flex justify-center'>No chat selected</h2>
                        <div className='flex gap-4 items-end justify-end bg-figma_bg px-8 py-2'>
                            <textarea
                                ref={textareaRef}
                                value={message}
                                onChange={handleOnChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-2xl resize-none border-opacity-20 overflow-hidden outline-none"
                                placeholder="Aa"
                                rows={1} // Start with one row
                            />
                            <div>
                                <button className='cursor-not-allowed'>
                                    <Send />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                <div className='col-span-10 lg:col-span-7 flex flex-col h-screen'>
                <div className='flex items-center gap-4 p-8 bg-figma_bg'>
                    <Link to={'/'} className='btn btn-secondary bg-opacity-15 hover:bg-opacity-15 text-slate-100 border-0'>
                        <ChevronLeft />
                    </Link>
                    <img src={selectedConversation?.profileImg || '/avatar.jpeg'} className='w-10 lg:w-14 rounded-full' />
                    <h1 className='text-xl lg:text-4xl font-bold'>{selectedConversation?.username} </h1>
                </div>
                <div className='flex-1 bg-figma_primary px-4 overflow-auto'>
                    {/* MESSAGES */}
                    {messages?.map((message) => (
                        <div key={message._id}  ref={lastMessageRef}>
                            <Message message={message} />
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='flex gap-4 items-center bg-figma_bg px-8 py-2'>
                        <textarea
                            ref={textareaRef}
                            value={message}
                            onChange={handleOnChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-2xl resize-none border-opacity-20 overflow-hidden outline-none"
                            placeholder="Aa"
                            rows={1} // Start with one row
                        />
                        <div>
                            <button>
                                <Send className='hover:text-red-500' />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
                </>
            )}

            {/* USER INFO */}
            {selectedConversation && <div className='col-span-3 hidden lg:flex flex-col px-4 items-center border-l border-white border-opacity-20 mt-40'>
                <img src='/avatar.jpeg' className='w-24 rounded-full hidden lg:block' />
                <Link to={`/profile/${selectedConversation?._id}`}>
                    <h2 className='hidden lg:flex lg:gap-2 text-2xl font-bold'>
                        @{selectedConversation?.username}
                        <span className='opacity-55 hidden sm:block'>#{selectedConversation?.tagName} </span>
                    </h2>
                </Link>
                <div className='hidden lg:flex justify-center max-w-50 flex-wrap'>
                    <div className='flex gap-1 flex-wrap mt-4'>
                        {selectedConversation?.games?.map((game, index) => (
                            <div key={index} className={`badge ${badgeList[index]} `}>{game}</div>
                        ))}
                    </div>
                </div>
            </div> }
        </div>
    );
};

export default ChatPage;