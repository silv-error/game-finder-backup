import { useQuery } from '@tanstack/react-query';
import React from 'react'

const useGetGameList = () => {
  
  const {data:gameList} = useQuery({
    queryKey: ["gameList"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users/games");
        const data = await res.json();
  
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
  
        return data;
      } catch (error) {
        throw new Error(error)
      }
    }
  });

  return {gameList};
}

export default useGetGameList