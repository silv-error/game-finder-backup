import Message from './Message.jsx';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import CHAT_HISTORY from '../../utils/db/users.js';
import ChatHistory from './ChatHistory.jsx';

const ChatPage = () => {
    const [value, setValue] = useState('');
    const textareaRef = useRef(null);
    const lineHeight = 24; // Adjust this value based on your font size and line height

    useEffect(() => {
        // Reset the height to auto to calculate the new height
        textareaRef.current.style.height = 'auto';
        // Set the height to the scroll height to fit the content
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, lineHeight * 3)}px`;
    }, [value]); // Run this effect whenever the value changes

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className='h-screen grid grid-cols-12 bg-figma_primary'>
            {/* CONVERSATIONS HISTORY  */}
            <div className='col-span-2 border-r border-white border-opacity-20'>
                <div className='flex flex-col h-screen'>
                    <div className='flex flex-2 items-center bg-figma_bg p-4'>
                        <h2 className='text-md md:text-2xl font-bold'>Chat History</h2>
                    </div>
                    <div className='flex-10 overflow-y-auto'>
                        {CHAT_HISTORY.map((chat) => (
                            <ChatHistory chat={chat} key={chat.id} />
                        ))}
                    </div>
                </div>
            </div>

            {/* MESSAGE CONTAINER */}
            <div className='col-span-10 lg:col-span-7 flex flex-col h-screen'>
                <div className='flex items-center gap-4 p-8 bg-figma_bg'>
                    <Link to={'/'} className='btn btn-secondary bg-opacity-15 hover:bg-opacity-15 text-slate-100 border-0'>
                        <ChevronLeft />
                    </Link>
                    <img src='/avatar.jpeg' className='w-10 lg:w-14 rounded-full' />
                    <h1 className='text-xl lg:text-4xl font-bold'>John Doe</h1>
                </div>
                <div className='flex-1 bg-figma_primary px-4 overflow-auto'>
                    {/* MESSAGES */}
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                </div>
                <div className='flex gap-4 items-center bg-figma_bg px-8 py-2'>
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-2xl resize-none border-opacity-20 overflow-hidden outline-none"
                        placeholder="Aa"
                        rows={1} // Start with one row
                    />
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send-icon lucide-send hover:text-primary">
                            <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                            <path d="m21.854 2.147-10.94 10.939" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* USER INFO */}
            <div className='col-span-3 hidden lg:flex flex-col px-4 items-center border-l border-white border-opacity-20'>
                <img src='/avatar.jpeg' className='w-24 rounded-full hidden lg:block' />
                <h2 className='hidden lg:block text-2xl font-bold'>@johndoe <span className='opacity-55 hidden sm:block'>#0000</span></h2>
                <div className='hidden lg:flex justify-center max-w-50 flex-wrap'>
                    <div className='flex gap-1 flex-wrap mt-4'>
                        <div className="badge badge-neutral">Valorant</div>
                        <div className="badge badge-primary">Minecraft</div>
                        <div className="badge badge-secondary">League of Legends</div>
                        <div className="badge badge-accent">Dota 2</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;