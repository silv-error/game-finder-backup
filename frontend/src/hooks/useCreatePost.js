import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react'
import toast from 'react-hot-toast';

const useCreatePost = () => {
  
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  
  const createPost = async (formData) => {
    setLoading(true);
    try {
      const success = handleError(formData);
      if (!success) return;

      const res = await fetch('/api/posts/create', {
        method: 'POST',
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

      queryClient.invalidateQueries(["posts"]);
      toast.success(data.message);
      return data;
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  return {createPost, loading};
}

export default useCreatePost

function handleError(formData) {
  if (!formData.name || !formData.description || !formData.rank || !formData.type) {
    toast.error("Please fill in all fields");
    return false;
  }

  if(formData.description.length > 60) {
    toast.error("Description must be less than 60 characters");
    return false;
  }

  return true;
}