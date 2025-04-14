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
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success("Profile updated successfully");
    },
  });

  return {updateProfile, isPending};
}

export default useUpdateProfile;