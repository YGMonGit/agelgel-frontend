import UserCard from '../../components/UserCard';
import { useListUsersQuery } from '../../api/slices/user.slices';
import React, { useEffect, useState } from 'react'
import { ERecipeStatus } from '../../api/types/recipe.type';
import { useModeratedRecipesQuery } from '../../api/slices/moderator.slices';
import { EVerified } from '../../api/types/user.type';

import EmptyListIcon from "../../assets/images/empty-list.png";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

function ModeratorUserList() {
  const [page, setPage] = useState(0);
  // const [filter, setFilter] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState<EVerified>(EVerified.verified);

  const { data: userList, isLoading, refetch, isFetching, isUninitialized } =
    useListUsersQuery({ page, verified: userStatus });
  const skeletonCount = isLoading
    ? page
    : userList?.length || 0;

  useEffect(() => {
    if (!isFetching && !isUninitialized) refetch()
  }, [userStatus, isUninitialized, refetch]);

  const pageChange = ({ direction }: { direction: string }) => {

    if (direction === "back") {
      setPage((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        else
          return 0;
      });
    } else {
      setPage((prev) => (
        prev + 1
      ));
    }
  };

  return (
    <div className='flex flex-col h-full justify-start items-center w-full pt-3'>
      <div className="w-full flex justify-start items-center gap-2 mb-3 mt-5">
        <button
          className="px-4 py-1 rounded-xl text-white outline-none border-none"
          style={{
            backgroundColor: userStatus == EVerified.verified ? "#15803D" : "#F3F4F6",
            color: userStatus == EVerified.verified ? "#FFFFFF" : "#15803D",
          }}
          onClick={() => {
            setUserStatus(EVerified.verified)
          }}
        >
          verified
        </button>
        <button
          className="px-4 py-1 rounded-xl text-white outline-none border-none"
          style={{
            backgroundColor: userStatus == EVerified.pending ? "#15803d" : "#F3F4F6",
            color: userStatus == EVerified.pending ? "#fff" : "#15803d",
          }}
          onClick={() => {
            setUserStatus(EVerified.pending)
          }}
        >
          pending
        </button>
      </div>
      {userList?.length !== 0 ? (
        <div className="w-full flex flex-col justify-start items-center">
          <div className="flex flex-col h-full justify-start items-center w-full pt-3 gap-2">
            {isLoading
              ? Array.from({ length: skeletonCount }).map((_, index) => (
                <UserCard user={null} key={`skeleton-${index}`} />
              ))
              : userList?.map((user, index) => (
                <UserCard user={user} key={index} />
              ))}
          </div>
          {!isFetching && (
            <div className="w-full p-5 flex justify-center items-center gap-3 mb-5 text-[1rem] select-none z-20">
              <button
                className="flex justify-center items-center border border-content-color rounded-lg p-2 px-5 shadow-md bg-slate-50 text-slate-500 text-[.9rem]"
                onClick={() => pageChange({ direction: "back" })}
              >
                <FaChevronLeft className="text-content-color text-[1.2rem]" />{" "}
                Back
              </button>
              <button
                className="flex justify-center items-center border border-content-color rounded-lg p-2 px-5 shadow-md bg-slate-50 text-slate-500 text-[.9rem]"
                onClick={() => pageChange({ direction: "forward" })}
              >
                Next{" "}
                <FaChevronRight className="text-content-color text-[1.2rem]" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center flex-grow">
          <img src={EmptyListIcon} alt="pic" className="w-[75%] sm:w-[50%]" />
          <div className="w-full px-5 flex justify-center items-center gap-3 mb-5 text-[1rem] select-none z-20">
            <button
              className="flex justify-center items-center border border-content-color rounded-lg p-2 px-5 shadow-md bg-slate-50 text-slate-500 text-[.9rem]"
              onClick={() => pageChange({ direction: "back" })}
            >
              <FaChevronLeft className="text-content-color text-[1.2rem]" />{" "}
              Back
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default ModeratorUserList