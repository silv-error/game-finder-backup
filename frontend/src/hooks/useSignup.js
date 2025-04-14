import React, { useState } from 'react'
import { useAuthContext } from '../context/useAuthContext';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useSignup = () => {
  
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();
  const queryClient = useQueryClient();

  const signup = async (formData) => {
    setLoading(true);
    try {
      const success = handleError(formData);
      if (!success) return;

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if(!res.ok) {
        console.error(data.error);
        throw new Error("Something went wrong");
      }
      queryClient.invalidateQueries(["authUser"]);
      return data;
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  return {signup, loading};
}

export default useSignup

function handleError(formData) {
  if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  return true;
}