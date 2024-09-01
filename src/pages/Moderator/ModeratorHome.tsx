import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
// import Search from "../components/Search";
import FilterBar from "../../components/FilterBar";
import FilterBarActive from "../../components/FilterBarActive";
import { filterData, postUrl } from "../../assets/data";
import DisplayCard from "../../components/DisplayCard";
import { useGetModeratorRecipesQuery, useGetRecipesQuery } from "../../api/slices/recipe.slices";
import { useNavigate } from "react-router-dom";
import EmptyListIcon from "../../assets/images/empty-list.png";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { Button } from "../../components/ui/button";
import { useGetModeratorQuery } from "../../api/slices/moderator.slices";
import { EPreferredMealTime, EPreferredMealTimeFilter } from "../../api/types/recipe.type";

function ModeratorHome() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
  });
  const [filter, setFilter] = useState<string | null>(null);

  const { data: recommendedRecipes, isLoading, refetch, isFetching, isUninitialized } =
    useGetModeratorRecipesQuery({ skip: pagination.skip, limit: pagination.limit, filter: filter || "all" }, {
      skip: filter ? false : true
    });

  const skeletonCount = isLoading
    ? pagination.limit
    : recommendedRecipes?.length || 0;

  const { data: user } = useGetModeratorQuery();


  return (
    <div className="w-full flex-wrap flex flex-col justify-start items-center relative min-h-[100%-56px]">
      <PageHeader
        header={`Good Morning, ${user?.first_name}!`}
        detail="Browse through our suggestions."
      />
      {/* <Search /> */}
      <div className="w-full px-5">
        <FilterBarActive data={Object.values(EPreferredMealTimeFilter)} selectedChip={filter as any} setSelectedChip={(filter) => {
          console.log({ filter });
          setFilter(filter);
          if (!isFetching && !isUninitialized) refetch();
        }} />
      </div>

      {recommendedRecipes?.length !== 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full px-5">
          {isLoading
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
    </div>
  );
}

export default ModeratorHome;