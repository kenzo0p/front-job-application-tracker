import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';



export const ProfileInfo = () => {
  // Mock session data
  const session = {
    data: {
      user: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        image: 'https://via.placeholder.com/150',
      },
    },
  };

  return (
    <div className="flex flex-col justify-center items-start my-3 gap-4">
      <div className="flex w-full mt-2 p-4 border rounded-md">
        <Avatar className="h-20 w-20">
          <AvatarImage src={session.data.user.image} />
          <AvatarFallback>
           {session.data.user.name}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-4 p-4 border rounded-md w-full min-h-[40vh]">
        <div className="flex justify-between items-center mb-3">
          <span>Profile Info</span>
        </div>
        <div className="flex flex-col gap-4">
          <Label>Name</Label>
          <Input
            disabled
            value={session.data.user.name}
            className="rounded focus-visible:ring-0 focus:outline-none focus:border-slate-500"
          />
        </div>
        <div className="flex flex-col gap-4">
          <Label>Email</Label>
          <Input
            disabled
            value={session.data.user.email}
            className="rounded focus-visible:ring-0 focus:outline-none focus:border-slate-500"
          />
        </div>
      </div>
    </div>
  );
};
