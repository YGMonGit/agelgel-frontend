import React from 'react'
import UserImage from "../assets/images/post/user_1.png";
import { MdVerified, MdEdit } from "react-icons/md";
import { IUser } from '../api/types/user.type';
import { Skeleton } from './ui/skeleton';

interface UserCardProps {
  user: IUser | null;
}

function UserCard({user}: UserCardProps) {
  if (!user) {
    return (
      <div className="flex justify-start items-center p-2 w-full rounded-lg bg-neutral-100 leading-4 select-none gap-3">
        <Skeleton className="h-[61px] aspect-square rounded-full" />
        <div className='flex-grow flex flex-col justify-center items-start h-full'>
          <Skeleton className="h-[10px] w-[55%] rounded-md" />
          <Skeleton className="h-[6px] w-[50%] mt-[6px] rounded-md" />
          <Skeleton className="h-[6px] w-[40%] mt-[2px] rounded-md" />
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
        {/* <Skeleton className="h-3 w-[55%] mt-2" /> */}
      </div>
    );
  }
  return (
    <div className='w-full flex justify-start items-center gap-2 py-2 bg-[#F6F6F6] px-3 rounded-lg'>
      <img src={user.profile_img} className='w-[61px] aspect-square rounded-full'/>
      <div className='w-full flex-grow flex flex-col justify-center items-start'>
        <p className='flex items-center gap-1 leading-none'>{user.first_name}{" "}{user.last_name} {user.verified && <MdVerified className='text-content-color'/>}</p>
        <p className='text-[.8rem] text-slate-400 leading-none mt-1'>{user.email}</p>
        <p className='text-[.8rem] text-slate-400 leading-none'>{user.phone_number}</p>
      </div>
      <MdEdit className='text-[2.2rem] text-content-color'/>
    </div>
  )
}

export default UserCard