import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateGameList = () => {
  
  const queryClient = useQueryClient();

  const {mutateAsync:updateGameList, isPending} = useMutation({
    mutationKey: ['updateGameList'],
    mutationFn: async(formData) => {
      try {
        const res = await fetch('/api/users/update', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
  
        if(!res.ok) {
          toast.error(data.error);
          throw new Error("Something went wrong");
        }
  
        Promise.all([
          queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
          queryClient.invalidateQueries({ queryKey: ["gameList"] }),
        ]);
        toast.success("Profile updated successfully");

        return data;
      } catch (error) {
        throw new Error(error);
      }
    }
  });

  return {updateGameList, isPending};
}

export default useUpdateGameList;