import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast';
import useStore from '../zustand/useStore';

const useSendMessage = ({ id }) => {
  
  const {setMessages, messages} = useStore();
  const queryClient = useQueryClient();

  const {mutate:sendMessage, isPending, isError, error} = useMutation({
    mutationFn: async({message}) => {
      try {

        const res = await fetch(`/api/messages/send/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({message})
        });
        const data = await res.json();

        if(!res.ok) {
          toast.error(data.error);
          throw new Error("Something went wrong");
        }

        setMessages([...messages, data]);
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatHistory"] });
    }
  });

  return { sendMessage, isPending, isError, error };
}

export default useSendMessage