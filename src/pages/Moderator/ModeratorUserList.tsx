import UserCard from '../../components/UserCard';
import { useListUsersQuery } from '../../api/slices/user.slices';
import React, { useState } from 'react'
import { ERecipeStatus } from '../../api/types/recipe.type';
import { useModeratedRecipesQuery } from '../../api/slices/moderator.slices';
import { EVerified } from '@/src/api/types/user.type';

import EmptyListIcon from "../../assets/images/empty-list.png";

function ModeratorUserList() {
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
  });
  // const [filter, setFilter] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState(true);

  const { data: userList, isLoading, refetch, isFetching, isUninitialized } =
  useListUsersQuery({page: 1, verified: userStatus});
  const skeletonCount = isLoading
    ? pagination.limit
    : userList?.length || 0;
  return (
    <div className='flex flex-col h-full justify-start items-center w-full pt-3'>
      <div className="w-full flex justify-start items-center gap-2 mb-7 mt-2">
        <button
          className="px-4 py-1 rounded-xl text-white outline-none border-none"
          style={{
            backgroundColor: userStatus ? "#15803D" : "#F3F4F6",
            color: userStatus ? "#FFFFFF" : "#15803D",
          }}
          onClick={() => setUserStatus(true)}
        >
          verified
        </button>
        <button
          className="px-4 py-1 rounded-xl text-white outline-none border-none"
          style={{
            backgroundColor: !userStatus ? "#15803d" : "#F3F4F6",
            color: !userStatus ? "#fff" : "#15803d",
          }}
          onClick={() => setUserStatus(false)}
        >
          pending
        </button>
      </div>
      {userList?.length !== 0 ? (
        <div className="flex flex-col h-full justify-start items-center w-full pt-3 gap-2">
          {isLoading
            ? Array.from({ length: skeletonCount }).map((_, index) => (
              <UserCard user={null} key={`skeleton-${index}`} />
            ))
            : userList?.map((user, index) => (
              <UserCard user={user} key={index} />
            ))}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center flex-grow">
          <img src={EmptyListIcon} alt="pic" className="w-[75%] sm:w-[50%]" />
        </div>
      )}
    </div>
  );
}

export default ModeratorUserList