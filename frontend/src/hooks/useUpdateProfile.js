import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/useAuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateProfile = () => {
  
  const queryClient = useQueryClient();

  const {mutateAsync:updateProfile, isPending} = useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: async(formData) => {
      try {
        const success = handleError(formData);
        if(!success) return;
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
  
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
        queryClient.invalidateQueries({ queryKey: ["gameList"] }),
      ]);
      toast.success("Profile updated successfully");
    },
  });

  return {updateProfile, isPending};
}

export default useUpdateProfile;

function handleError(formData) {
  const usernameRegex = /^(?=.{3,15}$)[a-zA-Z0-9_-]+$/;
  if(!usernameRegex.test(formData.username)) return false;

  const tagNameRegex = /^\d{4}$/;
  if(!tagNameRegex.test(formData.tagName)) return false;

  return true;
}