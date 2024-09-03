import React, { useState } from "react";

import EmptyListIcon from "../../assets/images/empty-list.png";
import IngredientCard from "../../components/IngredientCard";
import { useGetIngredientsQuery } from "../../api/slices/ingredient.slices";

import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { moderatorAddIngredientUrl } from "../../assets/data";

function ModeratorIngredientList() {
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
  });

  const {
    data: ingredientList,
    isLoading,
    refetch,
    isFetching,
    isUninitialized,
  } = useGetIngredientsQuery({
    skip: pagination.skip,
    limit: pagination.limit,
  });
  const skeletonCount = isLoading
    ? pagination.limit
    : ingredientList?.length || 0;
  return (
    <div className="flex flex-col h-full justify-start items-center w-full pt-3">
      {ingredientList?.length !== 0 ? (
        <div className="flex flex-col h-full justify-start items-center w-full pt-3 gap-2">
          {isLoading
            ? Array.from({ length: skeletonCount }).map((_, index) => (
                <IngredientCard ingredient={null} key={`skeleton-${index}`} />
              ))
            : ingredientList?.map((ingredient, index) => (
                <IngredientCard ingredient={ingredient} key={index} />
              ))}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center flex-grow">
          <img src={EmptyListIcon} alt="pic" className="w-[75%] sm:w-[50%]" />
        </div>
      )}
      <div className="w-full flex justify-end items-center sticky bottom-0 px-1 pb-5">
        <div
          className="w-14 h-14 bg-content-color flex justify-center items-center rounded-full text-[2rem] text-white"
          onClick={() => navigate(moderatorAddIngredientUrl)}
        >
          <IoAdd />
        </div>
      </div>
    </div>
  );
}

export default ModeratorIngredientList;
