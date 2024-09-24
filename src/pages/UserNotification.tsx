import React from "react";
import { notifications } from "../assets/data";
import NotificationCard from "../components/NotificationCard";
import PageHeader from "../components/PageHeader";

function UserNotification() {
  return (
    <div className="w-full flex-grow max-w-[800px] flex flex-col justify-start items-start">
      <PageHeader header="Notifications" detail="Check notifications about your recipes"/>
      <div className="w-full px-5 flex flex-col justify-start items-start gap-2">
        {notifications?.map((notification, index) => (
          <NotificationCard notification={notification} key={index} />
        ))}
      </div>
    </div>
  );
}

export default UserNotification;
