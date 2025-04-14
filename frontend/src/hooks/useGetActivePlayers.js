import { useQuery } from '@tanstack/react-query'

const useGetActivePlayers = () => {
  const {data:getActivePlayers, isLoading} = useQuery({
    queryKey: ["activePlayers"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users/active");
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

  return {getActivePlayers, isLoading};
}

export default useGetActivePlayers