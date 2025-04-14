import { useQuery } from '@tanstack/react-query'

const useGetPosts = () => {
  const {data:getPosts, isLoading} = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
  
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
  
        return data;
      } catch (error) {
        throw new Error(error);
      }
    }
  })


  return {getPosts, isLoading};
}

export default useGetPosts