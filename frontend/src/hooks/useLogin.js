import { useState } from 'react'
import { useAuthContext } from '../context/useAuthContext';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const useLogin = () => {
  
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();
  const queryClient = useQueryClient();

  const login = async (formData) => {
    setLoading(true);
    try {
      const success = handleError(formData);
      if (!success) return;

      const res = await fetch('/api/auth/login', {
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
      
      queryClient.invalidateQueries({ queryKey:["authUser"] });
      localStorage.setItem("game-hunter-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  return {login, loading};
}

export default useLogin

function handleError(formData) {
  if (!formData.email || !formData.password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}