import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
// import Search from "../components/Search";
import FilterBar from "../components/FilterBar";
import FilterBarActive from "../components/FilterBarActive";
import { filterData, postUrl } from "../assets/data";
import DisplayCard from "../components/DisplayCard";
import { IoAdd } from "react-icons/io5";
import { useGetRecipesQuery } from "../api/slices/recipe.slices";
import { useNavigate } from "react-router-dom";
import EmptyListIcon from "../assets/images/empty-list.png";

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
import { EPreferredMealTime, EPreferredMealTimeFilter } from "../api/types/recipe.type";

function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
  });

  const [filter, setFilter] = useState<EPreferredMealTimeFilter>(EPreferredMealTimeFilter.all);


  const { data: recommendedRecipes, isFetching, isUninitialized, refetch } =
    useGetRecipesQuery({
      skip: pagination.skip,
      limit: pagination.limit,
      filter: filter,
    });

  useEffect(() => {
    if (!isFetching && !isUninitialized) refetch();
  }, [filter, isUninitialized, refetch]);

  const skeletonCount = isFetching
    ? pagination.limit
    : recommendedRecipes?.length || 0;

  const { data: user } = useGetUserQuery();


  return (
    <div className="w-full flex-wrap flex-grow flex flex-col justify-start items-center relative min-h-[100%-56px]">
      <PageHeader
        header={`Good Morning, ${user?.first_name}!`}
        detail="Browse through our suggestions."
      />
      {/* <Search /> */}
      <div className="w-full px-5">
        <FilterBarActive data={["all", ...Object.values(EPreferredMealTime)]} selectedChip={filter} setSelectedChip={(filter) => {
          setFilter(filter as any);

        }} />
      </div>

      {recommendedRecipes?.length !== 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full px-5">
          {isFetching
            ? Array.from({ length: skeletonCount }).map((_, index) => (
              <DisplayCard post={null} key={`skeleton-${index}`} />
            ))
            : recommendedRecipes?.map((post, index) => (
              <DisplayCard post={post} key={index} />
            ))}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center flex-grow">
          <img src={EmptyListIcon} alt="pic" className="w-[75%] sm:w-[50%]" />
        </div>
      )}

      <div className="w-full flex justify-end items-center fixed bottom-0 px-5 pb-10">
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
