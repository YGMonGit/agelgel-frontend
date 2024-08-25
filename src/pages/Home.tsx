import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import Search from "../components/Search";
import FilterBar from "../components/FilterBar";
import { filterData, postUrl } from "../assets/data";
import DisplayCard from "../components/DisplayCard";
import { IoAdd } from "react-icons/io5";
import { useGetRecipesQuery } from "../api/slices/recipe.slices";
import { useNavigate } from "react-router-dom";

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

function Home() {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
  });

  const { data: recommendedRecipes, isLoading } =
    useGetRecipesQuery(pagination);

  const skeletonCount = isLoading
    ? pagination.limit
    : recommendedRecipes?.length || 0;

  const { data: user } = useGetUserQuery();


  return (
    <div className="w-full flex-wrap flex flex-col justify-start items-center relative">
      <PageHeader
        header={`Good Morning, ${user?.first_name}!`}
        detail="Browse through our suggestions."
      />
      <Search />
      <div className="w-full px-5">
        <FilterBar data={filterData} />
      </div>
      <div className="w-full px-5 flex justify-evenly items-start gap-3 flex-wrap">
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, index) => (
            <DisplayCard post={null} key={`skeleton-${index}`} />
          ))
          : recommendedRecipes?.map((post, index) => (
            <DisplayCard post={post} key={index} />
          ))}
      </div>

      <button
        className="w-14 h-14 bg-content-color flex justify-center items-center rounded-full text-[2rem] text-white fixed bottom-10 right-5"
        onClick={() => navigate(postUrl)}
      >
        <IoAdd />
      </button>
    </div>
  );
}

export default Home;
