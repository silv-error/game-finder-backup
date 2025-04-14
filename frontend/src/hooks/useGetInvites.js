import { useQuery } from '@tanstack/react-query'

const useGetInvites = () => {
  
  const {data:getInvites, isLoading} = useQuery({
    queryKey: ["invites"],
    queryFn: async () => {
      try {
        const res = await fetch('/api/posts/invites');
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

  return (getInvites, isLoading)
}

export default useGetInvites