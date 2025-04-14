import { useQuery } from '@tanstack/react-query'

const useGetUserProfile = ({ id }) => {
  
  const {data:getUserProfile, isLoading, refetch} = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/users/profile/${id}`);
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

  return {getUserProfile, isLoading, refetch};
}

export default useGetUserProfile;