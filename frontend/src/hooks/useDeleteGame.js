import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

const useDeleteGame = () => {

  const queryClient = useQueryClient();
  
  const {mutate:deleteGame, isPending} = useMutation({
    mutationFn: async(name) => {
      try {
        const res = await fetch(`/api/users/delete/game/${name}`, {
          method: 'DELETE'
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["userProfile"]);
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Failed to delete game");
    }
  });

  return {deleteGame, isPending};
}

export default useDeleteGame