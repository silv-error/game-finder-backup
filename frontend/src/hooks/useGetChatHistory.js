import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useGetChatHistory = () => {
  
  const {data:chatHistory} = useQuery({
    queryKey: ['chatHistory'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/messages/');
        const data = await res.json();

        if(!res.ok) {
          throw new Error("Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    }
  });

  return {chatHistory}
}

export default useGetChatHistory