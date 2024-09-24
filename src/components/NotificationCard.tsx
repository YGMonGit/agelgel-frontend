import React from 'react'
import { ENotification } from '../api/types/user.type'
import { MdCheck } from 'react-icons/md'

function NotificationCard({notification}: {notification: ENotification}) {
  return (
    <div className={`w-full flex justify-between items-center ${notification.seen ? "bg-[#F6F6F6]": notification.status === "verified" ? "bg-green-100" : "bg-red-100"} gap-2 py-2  px-3 rounded-lg`}>
      
      <div className='flex flex-col justify-center items-start h-full'>
        <h2 className='text-[1.1rem] font-semibold -mb-1'>{notification.title}</h2>
        <p className='text-[.9rem] text-slate-500 leading-4'>{notification.message}</p>
      </div>
      {notification.seen === false && (
        <div className='p-1 border border-content-color rounded-full'>
          <MdCheck className='text-[1rem] text-content-color'/>
        </div>
      )}
    </div>
  )
}

export default NotificationCard