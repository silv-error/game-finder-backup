import { useQuery } from "@tanstack/react-query";

const useGetLatestPost = () => {
  const {data:latestPost, isLoading} = useQuery({
    queryKey: ["latestPost"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/posts/latest");
        const data = await res.json();
  
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
  
        return data;
      } catch (error) {
        throw new Error(error);
      }
    }
  });

  return {latestPost, isLoading};
}

export default useGetLatestPost