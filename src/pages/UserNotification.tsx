import React, { useState } from "react";
import NotificationCard from "../components/NotificationCard";
import PageHeader from "../components/PageHeader";
import { useGetMyNotificationQuery } from "../api/slices/notification.slices";

function UserNotification() {

  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
  });
  const { data: notifications, isLoading } = useGetMyNotificationQuery(pagination);
  return (
    <div className="w-full flex-grow max-w-[800px] flex flex-col justify-start items-start">
      <PageHeader header="Notifications" detail="Check notifications about your recipes" />
      <div className="w-full px-5 flex flex-col justify-start items-start gap-2">
        {notifications && notifications?.map((notification, index) => (
          <NotificationCard notification={notification} key={index} />
        ))}
      </div>
    </div>
  );
}

export default UserNotification;
