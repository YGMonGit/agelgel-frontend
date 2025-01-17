import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
// import Search from "../components/Search";
import FilterBar from "../components/FilterBar";
import FilterBarActive from "../components/FilterBarActive";
import { filterData, postUrl } from "../assets/data";
import DisplayCard from "../components/DisplayCard";
import { IoAdd } from "react-icons/io5";
import { useGetRecipesQuery, useRecommendationQuery } from "../api/slices/recipe.slices";
import { useNavigate } from "react-router-dom";
import EmptyListIcon from "../assets/images/empty-list.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { Button } from "../components/ui/button";
import { useGetUserQuery } from "../api/slices/user.slices";
import {
  EPreferredMealTime,
  EPreferredMealTimeFilter,
} from "../api/types/recipe.type";

function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const navigate = useNavigate();

  const pageSize = 10
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: pageSize,
  });

  useEffect(() => {
    console.log(pagination);
  }, [pagination]);

  const [filter, setFilter] = useState<EPreferredMealTimeFilter>(
    EPreferredMealTimeFilter.all
  );

  const {
    data: recommendedRecipes,
    isFetching,
    isUninitialized,
    refetch,
  } = useRecommendationQuery({
    skip: pagination.skip,
    limit: pagination.limit,
    filter,
  });

  useEffect(() => {
    if (!isFetching && !isUninitialized) refetch();
  }, [filter, isUninitialized, refetch]);

  const skeletonCount = isFetching
    ? pagination.limit
    : recommendedRecipes?.length || 0;

  const { data: user } = useGetUserQuery();

  const pageChange = ({ direction }: { direction: string }) => {

    if (direction === "back") {
      setPagination((prev) => {
        if (prev.skip - pageSize < 0) {
          return ({
            skip: 0,
            limit: pageSize,
          });
        }
        else
          return ({
            skip: prev.skip - pageSize,
            limit: prev.limit - pageSize,
          });
      });
    } else {
      setPagination((prev) => ({
        skip: prev.skip + pageSize,
        limit: prev.limit + pageSize,
      }));
    }
  };

  return (
    <div className="w-full flex-wrap flex-grow flex flex-col justify-start items-center relative min-h-[100%-56px]">
      <PageHeader
        header={`Good Morning, ${user?.first_name}!`}
        detail="Browse through our suggestions."
      />
      {/* <Search /> */}
      <div className="w-full px-5">
        <FilterBarActive
          data={["all", ...Object.values(EPreferredMealTime)]}
          selectedChip={filter}
          setSelectedChip={(filter) => {
            setFilter(filter as any);
          }}
        />
      </div>

      {recommendedRecipes?.length !== 0 ? (
        <div className="w-full flex flex-col justify-start items-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full px-5 mb-5">
            {isFetching
              ? Array.from({ length: skeletonCount }).map((_, index) => (
                <DisplayCard post={null} key={`skeleton-${index}`} />
              ))
              : recommendedRecipes?.map((post, index) => (
                <DisplayCard post={post} key={index} />
              ))}
          </div>
          {!isFetching && (
            <div className="w-full px-5 flex justify-center items-center gap-3 mb-5 text-[1rem] select-none z-20">
              <button
                className="flex justify-center items-center border border-content-color rounded-lg p-2 px-5 shadow-md bg-slate-50 dark:bg-neutral-800 dark:border-0 text-slate-500 text-[.9rem]"
                onClick={() => pageChange({ direction: "back" })}
              >
                <FaChevronLeft className="text-content-color text-[1.2rem]" />{" "}
                Back
              </button>
              <button
                className="flex justify-center items-center border border-content-color rounded-lg p-2 px-5 shadow-md bg-slate-50 dark:bg-neutral-800 dark:border-0 text-slate-500 text-[.9rem]"
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
              className="flex justify-center items-center border border-content-color rounded-lg p-2 px-5 shadow-md bg-slate-50 dark:bg-neutral-800 dark:border-0 text-slate-500 text-[.9rem]"
              onClick={() => pageChange({ direction: "back" })}
            >
              <FaChevronLeft className="text-content-color text-[1.2rem]" />{" "}
              Back
            </button>

          </div>
        </div>
      )}

      <div className="w-full flex justify-end items-center fixed bottom-0 px-2 pb-5 max-w-[800px]">
        <div
          className="w-14 h-14 bg-content-color flex justify-center items-center rounded-full text-[2rem] text-white"
          onClick={() => navigate(postUrl)}
        >
          <IoAdd />
        </div>
      </div>
    </div>
  );
}

export default Home;