import { useQuery } from '@tanstack/react-query'
import useStore from '../zustand/useStore.js'
import { useEffect } from 'react';

const useGetMessages = ({id}) => {

  const {messages, setMessages, selectedConversation} = useStore();
  
  const {data:getMessages, refetch} = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error("Something went wrong");
        }
  
        setMessages(data);
        return data;
      } catch (error) {
        throw new Error(error)
      }
    }
  });

  useEffect(() => {
    refetch();
  }, [id, selectedConversation?._id, setMessages, refetch]);

  return { messages, refetch };
}

export default useGetMessages