import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const useDeletePost = () => {
  const queryClient = useQueryClient();
  const [post, setPost] = useState(null);
  const { mutate } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async (postId) => {
      try {
        const res = await fetch(`/api/posts/${postId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        toast.success(data.message);
      } catch (error) {
        throw new Error(error);
      } finally {
        setPost(null);
      }
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["posts"] }),
        queryClient.invalidateQueries({ queryKey: ["latestPost"] }),
      ]);
    },
  });

  return { mutate, post, setPost };
};

export default useDeletePost;
