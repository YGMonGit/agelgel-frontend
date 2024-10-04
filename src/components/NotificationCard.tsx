import React from 'react'
import { MdCheck } from 'react-icons/md'
import { INotification } from '../api/types/notification.type'
import { useMarkAsReadMutation } from '../api/slices/notification.slices'

function NotificationCard({ notification }: { notification: INotification }) {

  const [markAsRea] = useMarkAsReadMutation();

  const onCardClick = async () => {
    try {
      await markAsRea({ id: notification._id }).unwrap();
    } catch (error) {

    }
  }
  return (
    <div className={`w-full flex justify-between items-center ${notification.isRead ? "bg-neutral-200 dark:bg-neutral-800" : "bg-red-200 dark:bg-red-300 dark:bg-opacity-15"} gap-2 py-2  px-3 rounded-lg`}>

      <div className='flex flex-col justify-center items-start h-full'>
        <h2 className='text-[1.1rem] font-semibold -mb-1'>{notification.review ? "New review" : "New Notification"}</h2>
        <p className='text-[.9rem] text-slate-500 leading-4'>
          {`
            ${notification.user.full_name}
            ${notification.review.comment}
            ${notification.review.rating} star
        `}</p>
      </div>
      {notification.isRead === false && (
        <div className='p-1 border border-content-color rounded-full'>
          <MdCheck onClick={onCardClick} className='text-[1rem] text-content-color' />
        </div>
      )}
    </div>
  )
}

export default NotificationCard