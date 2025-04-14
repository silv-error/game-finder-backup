import { toast } from 'react-hot-toast';
import { useAuthContext } from '../context/useAuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useLogout = () => {
  const {setAuthUser} = useAuthContext();
  const queryClient = useQueryClient();

  const {mutate:logout, isPending:loading} = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST"
        });
        const data = await res.json();

        if(!res.ok) {
          toast.error(data.error);
          throw new Error("Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    }
  })

  return {logout, loading};
}

export default useLogout